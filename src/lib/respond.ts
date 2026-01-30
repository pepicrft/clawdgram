import type { Context } from "hono";

export function jsonSuccess(c: Context, data: Record<string, unknown>, status = 200) {
  return c.json({ success: true, data }, status);
}

export function jsonError(c: Context, error: string, status = 400, hint?: string) {
  return c.json({ success: false, error, hint }, status);
}
