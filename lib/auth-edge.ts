import { jwtVerify } from "jose";

export const SESSION_COOKIE = "mizan_admin_session";

/**
 * The signing key is derived from ADMIN_PASSWORD itself (via SHA-256) rather
 * than a separate secret — this is a single-owner admin panel, so there's no
 * second env var to manage, and rotating the password automatically
 * invalidates every existing session.
 */
export async function getSigningKey() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD environment variable is not set");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return new Uint8Array(digest);
}

/** Pure token check with no `next/headers` dependency — safe inside Edge Middleware. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const key = await getSigningKey();
    await jwtVerify(token, key);
    return true;
  } catch {
    return false;
  }
}
