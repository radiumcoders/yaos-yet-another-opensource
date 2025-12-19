CREATE TABLE "buckets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"share_id" text NOT NULL,
	"title" text DEFAULT 'My Bucket' NOT NULL,
	"components" jsonb NOT NULL,
	"created_by" text NOT NULL,
	CONSTRAINT "buckets_share_id_unique" UNIQUE("share_id")
);
