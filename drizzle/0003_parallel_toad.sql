CREATE TABLE IF NOT EXISTS "mpesa_statements_pdfs" (
	"id" text PRIMARY KEY NOT NULL,
	"pdf_file" varchar(255) NOT NULL,
	"pdf_password" varchar(6) NOT NULL,
	"strapiId" integer NOT NULL,
	"userId" text NOT NULL
);
