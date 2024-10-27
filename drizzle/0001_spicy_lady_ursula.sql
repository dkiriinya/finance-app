CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"paystackId" text NOT NULL,
	"subscription_status" text NOT NULL,
	"next_payment_date" timestamp NOT NULL,
	"subscription_code" text,
	"isPaid" boolean NOT NULL,
	"email_token" text
);
