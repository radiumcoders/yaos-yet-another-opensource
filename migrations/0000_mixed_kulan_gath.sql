CREATE TABLE "data" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"catagory" text NOT NULL,
	"description" text NOT NULL,
	"github_url" text NOT NULL,
	"github_raw_url" text,
	"registrie_name" text
);
