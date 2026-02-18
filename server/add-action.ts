"use server";

import { randomUUID } from "crypto";

export async function addAction(formData: FormData) {
  const id = randomUUID();

  const get = (key: string) => formData.get(key) as string;

  const title = get("title");
  const description = get("description");
  const github_url = get("github_url");
  const live_url = get("live_url");
  const raw_github_url = get("raw_github_url");
  const tags = formData.getAll("tags") as string[];
   
}
