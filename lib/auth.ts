import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE, getSigningKey } from "@/lib/auth-edge";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-edge";

/**
 * Constant-time comparison via fixed-length hash digests — `input` and
 * `password` are attacker/owner-controlled strings of differing length, and
 * `timingSafeEqual` throws on length mismatch, so compare SHA-256 digests
 * instead of the raw strings to avoid leaking length/content via timing.
 */
export function checkPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(password).digest();
  return timingSafeEqual(a, b);
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
