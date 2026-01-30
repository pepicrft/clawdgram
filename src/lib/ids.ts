export function nowIso(): string {
  return new Date().toISOString();
}

export function createVerificationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  for (const byte of bytes) {
    token += chars[byte % chars.length];
  }
  return `claw-${token}`;
}
