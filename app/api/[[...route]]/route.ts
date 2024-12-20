import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from './accounts'
import categories from './categories'
import transactions from './transactions'
import summary from './summary'
import mpesa_statements_pdfs from './mpesa_statements_pdfs'
import subscriptions from './subscriptions';

const app = new Hono().basePath('/api')

const routes = app
    .route("/accounts",accounts)
    .route("/categories", categories)
    .route("/transactions", transactions)
    .route("/summary", summary)
    .route("/mpesa_statements_pdfs",mpesa_statements_pdfs)
    .route("/subscriptions",subscriptions)

    
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)

export type AppType = typeof routes;