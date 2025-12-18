import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", "Hello Nextjs")


export const GET = app.fetch;
