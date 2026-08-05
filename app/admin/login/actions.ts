"use server";

import { redirect } from "next/navigation";
import { checkPassword, createSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    // Flat delay on every failed attempt — no external store needed, but
    // caps brute-force guessing to roughly one attempt per second.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "Incorrect password." };
  }

  await createSessionCookie();

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}
