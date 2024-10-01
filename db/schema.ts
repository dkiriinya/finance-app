import {z} from 'zod'
import { integer, pgTable,text,timestamp,varchar } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import {relations} from 'drizzle-orm'

export const accounts = pgTable("accounts",{
    id: text("id").primaryKey(),
    plaidId:text("plaid_id"),
    name: text("name").notNull(),
    userId:text("user_id").notNull(),
})

export const accountsRelations = relations(accounts, ({many})=>({
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories",{
    id: text("id").primaryKey(),
    plaidId:text("plaid_id"),
    name: text("name").notNull(),
    userId:text("user_id").notNull(),
})

export const categoriesRelations = relations(categories, ({many})=>({
    transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions",{
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes:text("notes"),
    date:timestamp("date", {mode: "date"}).notNull(),
    categoryId:text("category_id").references(()=>categories.id,{onDelete:"set null"}),
    accountId:text("account_id").references(()=>accounts.id,{onDelete:"cascade"}).notNull(),
})

export const transactionsRelations = relations(transactions, ({one})=>({
    category: one(categories, {
        fields:[transactions.categoryId],
        references:[categories.id]
    }),
    account: one(accounts, {
        fields:[transactions.accountId],
        references:[accounts.id]
    }),
}));

export const insertTransactionSchema = createInsertSchema(transactions,{
    date:z.coerce.date(),
});

export const mpesa_statements_pdfs = pgTable("mpesa_statements_pdfs",{
    id: text("id").primaryKey(),
    pdf_url: varchar("pdf_file", { length: 255 }).notNull(),
    pdf_password: varchar("pdf_password", { length: 6 }).notNull(), 
    strapiId:integer("strapiId").notNull(),
    userId:text("userId").notNull()
})

export const insertMpesaStatementsPdfsSchema = createInsertSchema(mpesa_statements_pdfs,{
    pdf_password: z
    .string()
    .length(6, "Password must be exactly 6 digits") 
    .regex(/^\d+$/, "Password must be numeric"), 
})
