"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/intex";
import { todo } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

export const addTodo = async (
  id: number,
  title: string,
  description: string,
  githubUrl: string
) => {
  await db.insert(todo).values({
    id: id,
    title: title,
    description: description,
    githubUrl: githubUrl,
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/");
};
