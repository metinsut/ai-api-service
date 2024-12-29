CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"gender" text NOT NULL,
	"avatar" text,
	"company" text NOT NULL,
	"department" text NOT NULL,
	"position" text NOT NULL,
	"language" text,
	"university" text,
	"country" text NOT NULL,
	"birth_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
