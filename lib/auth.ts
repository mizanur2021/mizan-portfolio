import "server-only";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE, getSigningKey } from "@/lib/auth-edge";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-edge";

export function checkPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && input === password;
}

export async function createSessionCookie(): Promise<void> {
  const key = await getSigningKey();
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(key);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
