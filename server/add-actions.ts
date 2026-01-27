"use server";
import { db } from "@/db/index";
import { dataTable } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";
import { v4 as uuid } from "uuid";

export const getData = async (catagory?: string) => {
  if (catagory) {
    const data = await db
      .select()
      .from(dataTable)
      .where(eq(dataTable.catagory, catagory));
    return data;
  }
  const data = await db.select().from(dataTable);
  return data;
};

export const getDataBySearch = unstable_cache(
  async (search: string) => {
    const data = await db
      .select()
      .from(dataTable)
      .where(ilike(dataTable.title, `%${search}%`));
    return data;
  },
  ["search-data"],
  {
    tags: ["search"],
  },
);

export const addData = async (formData: FormData) => {
  const title = (formData.get("title") as string).replace(/ /g, "-");
  const description = formData.get("description") as string;
  const catagory = formData.get("catagory") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const githubRawUrl = formData.get("githubRawUrl") as string;
  const registriesName = formData.get("registrieName") as string;
  const id = uuid();

  await db.insert(dataTable).values({
    id: id,
    title: title,
    description: description,
    catagory: catagory,
    githubUrl: githubUrl,
    githubRawUrl: githubRawUrl,
    registrieName: registriesName,
  });

  revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
  await db.delete(dataTable).where(eq(dataTable.id, id));

  revalidatePath("/");
};

export const getFromTitle = async (title: string) => {
  const data = await db
    .select()
    .from(dataTable)
    .where(eq(dataTable.title, title));
  return data;
};
