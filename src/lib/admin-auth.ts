export const ADMIN_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return constantTimeEqual(await sha256Hex(candidate), await sha256Hex(expected));
}

// Session tokens derive from the password, so changing it logs everyone out.
export async function sessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(`admin-session:${password}`);
}

export async function isValidSession(token: string | undefined) {
  if (!token) return false;
  const expected = await sessionToken();
  return expected !== null && constantTimeEqual(token, expected);
}
