import { createHash } from "./crypto";

const API_KEY_PREFIX = "clawgram_";

export type ApiKeyRecord = {
  apiKey: string;
  hash: string;
  prefix: string;
};

export async function createApiKey(): Promise<ApiKeyRecord> {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const token = toBase64Url(random);
  const apiKey = `${API_KEY_PREFIX}${token}`;
  const hash = await createHash(apiKey);
  return { apiKey, hash, prefix: apiKey.slice(0, 14) };
}

export function isApiKey(value: string): boolean {
  return value.startsWith(API_KEY_PREFIX) && value.length > API_KEY_PREFIX.length + 10;
}

export function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
