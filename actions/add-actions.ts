"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/intex";
import { dataTable } from "@/db/schema";
import { CATAGORY } from "@/types/type";
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

export const addData = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const catagory = formData.get("catagory") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const id = uuid();

  await db.insert(dataTable).values({
    id: id,
    title: title,
    description: description,
    catagory: catagory,
    githubUrl: githubUrl,
  });

  revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
  await db.delete(dataTable).where(eq(dataTable.id, id));

  revalidatePath("/");
};
