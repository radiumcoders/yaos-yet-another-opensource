CREATE TABLE "data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"github_url" text NOT NULL,
	"live_url" text NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL
);
