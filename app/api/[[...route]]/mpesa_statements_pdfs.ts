import {z} from 'zod';
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and,eq } from "drizzle-orm";
import { mpesa_statements_pdfs } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import {zValidator} from "@hono/zod-validator";
import { insertMpesaStatementsPdfsSchema } from "@/db/schema";
import {createId} from "@paralleldrive/cuid2";
import { useDeleteMpesaStatementUpload } from '@/features/strapi/api/use-delete-mpesa-statement-upload';

const app = new Hono()
    .get("/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({error:"unauthorized"},401);
            }
        
            const data = await db
            .select({
                id:mpesa_statements_pdfs.id,
                pdf_url:mpesa_statements_pdfs.pdf_url,
                pdf_password:mpesa_statements_pdfs.pdf_password,
                strapiId:mpesa_statements_pdfs.strapiId
            }).from(mpesa_statements_pdfs)
            .where(eq(mpesa_statements_pdfs.userId,auth.userId))
            return c.json({data})
        }
    )
    .get("/:id",
        zValidator("param",z.object({
            id:z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const {id} = c.req.valid("param")

            if (!id) {
                return c.json({error: "Missing id"}, 400);
               }

            if (!auth?.userId) {
                return c.json({error:"unauthorized"}, 401);
            }

            const [data] = await db
            .select({
                id:mpesa_statements_pdfs.id,
                pdf_url:mpesa_statements_pdfs.pdf_url,
                pdf_password:mpesa_statements_pdfs.pdf_password,
                strapiId:mpesa_statements_pdfs.strapiId
            }).from(mpesa_statements_pdfs)
            .where(and(eq(mpesa_statements_pdfs.userId, auth.userId),eq(mpesa_statements_pdfs.id, id)))
            return c.json({data})
        }
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json",insertMpesaStatementsPdfsSchema.pick({
            pdf_url: true,
            pdf_password: true,
            strapiId:true
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
               }
            const [data] = await db
            .insert(mpesa_statements_pdfs)
            .values({
                id:createId(),
                userId:auth.userId,
                ...values
            })
            .returning()
            return c.json({data})
        }
      )      
      .delete("/:id",
        zValidator("param", z.object({
          id: z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
          const auth = getAuth(c);
          const { id } = c.req.valid("param");
      
          if (!id) {
            return c.json({ error: "Missing id" }, 400);
          }
      
          if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
          }
      
          const [data] = await db
            .select({
              id: mpesa_statements_pdfs.id,
              strapiId: mpesa_statements_pdfs.strapiId,
            })
            .from(mpesa_statements_pdfs)
            .where(and(
              eq(mpesa_statements_pdfs.userId, auth.userId), 
              eq(mpesa_statements_pdfs.id, id)));
              
          if (!data) {
            return c.json({ error: "MPESA statement not found" }, 404);
          }
      
          try {
            await useDeleteMpesaStatementUpload(data.strapiId);
      
            await db
              .delete(mpesa_statements_pdfs)
              .where(and(eq(mpesa_statements_pdfs.userId, auth.userId), eq(mpesa_statements_pdfs.id, id)))
              .returning({
                id: mpesa_statements_pdfs.id,
              });
      
            return c.json({ success: true, message: "MPESA statement deleted successfully" });
          } catch (error) {
            console.error("Error deleting MPESA statement:", error);
            return c.json({ error: "Failed to delete MPESA statement" }, 500);
          }
        }
      );

export default app;