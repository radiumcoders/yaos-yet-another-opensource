"use server";

import { auth } from "@/lib/auth";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });
}
