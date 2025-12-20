import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";

const bucket = new Elysia({ prefix: "/bucket" })
  .post("/create", async () => {
    const bucketID = `bucket:${nanoid(10)}`;
    await redis.set(bucketID, JSON.stringify({ components: [] }));
    await redis.expire(bucketID, 60 * 60 * 2); // expire in 2 hours
    return { bucketID };
  })
  .post("/add-component", async ({ body }) => {
    const { bucketID, component } = body as {
      bucketID: string;
      component: string;
    };
    const data = await redis.get(bucketID);
    if (!data) {
      return { error: "Bucket not found" };
    }
    const bucket = JSON.parse(data as string);
    bucket.components.push(component);
    await redis.set(bucketID, JSON.stringify(bucket));
    return { success: true, bucket };
  });

const app = new Elysia({ prefix: "/api" }).use(bucket);

export const GET = app.fetch;
export const POST = app.fetch;
export type App = typeof app;
