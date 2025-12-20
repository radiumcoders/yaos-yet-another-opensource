CREATE TABLE "buckets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"share_id" text NOT NULL,
	"title" text DEFAULT 'My Bucket' NOT NULL,
	"components" jsonb NOT NULL,
	"created_by" text NOT NULL,
	CONSTRAINT "buckets_share_id_unique" UNIQUE("share_id")
);
--> statement-breakpoint
CREATE TABLE "data" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"catagory" text NOT NULL,
	"description" text NOT NULL,
	"github_url" text NOT NULL,
	"github_raw_url" text,
	"registrie_name" text
);
