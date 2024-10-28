import { z } from 'zod';
import { Hono } from 'hono';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import {subscriptions } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { verifySignature } from '@/lib/utils';
import { createId } from '@paralleldrive/cuid2';

const app = new Hono()
    .get("/:id",
        clerkMiddleware(),
        zValidator("param",z.object({
            id:z.string().optional(),
        })),
        async (c) => {
            const {id} = c.req.valid("param");
            const auth = getAuth(c);

            if (!id){
                return c.json({message:"Missing id"},400);
            }
            
            if (!auth?.userId) {
                return c.json({message:"Unauthorized"},401);
            }
            const [data] = await db
                .select()
                .from(subscriptions)
                .where(eq(subscriptions.userId,auth.userId))
            return c.json({data});
        }
    )
    .post('/webhook', async (c) => {
        try {
            const body = await c.req.json();
            const signature = c.req.header('x-paystack-signature');
    
            if (!verifySignature(body, signature!)) {
                return c.json({ message: 'Invalid signature' }, 401);
            }
    
            const paystackId = body?.data?.customer?.customer_code;
            const event = body.event;
            console.log("event: ",event)
            console.log("data: ",body?.data)
    
            if (!paystackId) {
                return c.json({ message: 'Missing Paystack ID' }, 400);
            }
    
            let userId = "";
            if (body?.data?.metadata?.custom_fields && Array.isArray(body.data.metadata.custom_fields) && body.data.metadata.custom_fields.length > 0) {
                userId = body.data.metadata.custom_fields[0].value;
            }
    
            const subscription_code = body?.data?.subscription_code || "";
            const next_payment_date = body?.data?.next_payment_date
                ? new Date(body.data.next_payment_date)
                : new Date(Date.now() + 60 * 60 * 1000);
    
            const [existingSubscription] = await db
                .select()
                .from(subscriptions)
                .where(eq(subscriptions.paystackId, paystackId));
    
            switch (event) {
                case 'charge.success':
                    if (existingSubscription) {
                        if (!existingSubscription.userId && userId) {
                            const [chargeData] = await db
                                .update(subscriptions)
                                .set({ userId, isPaid: true, next_payment_date, subscription_status: 'active' })
                                .where(eq(subscriptions.paystackId, paystackId))
                                .returning();
                            return c.json({ chargeData });
                        }
    
                        const [chargeData] = await db
                            .update(subscriptions)
                            .set({ isPaid: true, next_payment_date })
                            .where(eq(subscriptions.paystackId, paystackId))
                            .returning();
                        return c.json({ chargeData });
                    } 
                    
                    else {
                        const [newSubscription] = await db
                            .insert(subscriptions)
                            .values({
                                id: createId(),
                                paystackId,
                                isPaid: true,
                                next_payment_date,
                                userId,
                                subscription_status: 'active'
                            })
                            .returning();
                        return c.json({ newSubscription });
                    }
    
                case 'subscription.create':
                    if (existingSubscription) {
                        if (!existingSubscription.subscription_code && subscription_code) {
                            const [updatedData] = await db
                                .update(subscriptions)
                                .set({ subscription_code })
                                .where(eq(subscriptions.paystackId, paystackId))
                                .returning();
                            return c.json({ updatedData });
                        }
                        return c.json({ message: 'Subscription already exists' });
                    } else {
                        const [newSubscriptionData] = await db
                            .insert(subscriptions)
                            .values({
                                id: createId(),
                                paystackId,
                                subscription_code,
                                subscription_status: 'active',
                                next_payment_date,
                                isPaid: true
                            })
                            .returning();
                        return c.json({ newSubscriptionData });
                    }
    
                case 'subscription.disable':
                    if (existingSubscription) {
                        const [disableData] = await db
                            .update(subscriptions)
                            .set({ subscription_status: 'cancelled', isPaid: false })
                            .where(eq(subscriptions.paystackId, paystackId))
                            .returning();
                        return c.json({ data: disableData });
                    }
                    return c.json({ message: 'Subscription not found' }, 404);
    
                case 'subscription.not_renew':
                    if (existingSubscription) {
                        const [notRenewData] = await db
                            .update(subscriptions)
                            .set({ subscription_status: 'not_renew' })
                            .where(eq(subscriptions.paystackId, paystackId))
                            .returning();
                        return c.json({ data: notRenewData });
                    }
                    return c.json({ message: 'Subscription not found' }, 404);
    
                case 'invoice.create':
                case 'invoice.update':
                    if (existingSubscription) {
                        const [invoiceData] = await db
                            .update(subscriptions)
                            .set({ isPaid: true })
                            .where(eq(subscriptions.paystackId, paystackId))
                            .returning();
                        return c.json({ invoiceData });
                    }
                    return c.json({ message: 'Subscription not found' }, 404);
    
                case 'invoice.payment_failed':
                    if (existingSubscription) {
                        const [failedInvoiceData] = await db
                            .update(subscriptions)
                            .set({ isPaid: false, subscription_status: 'payment_failed' })
                            .where(eq(subscriptions.paystackId, paystackId))
                            .returning();
                        return c.json({ failedInvoiceData });
                    }
                    return c.json({ message: 'Subscription not found' }, 404);
    
                default:
                    return c.json({ message: 'Unhandled event type' }, 400);
            }
        } catch (error) {
            
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(errorMessage)
            return c.json({ message: 'Error processing webhook', error: errorMessage }, 500);
        }
    })
    

export default app;
