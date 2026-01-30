import { describe, expect, it } from "vitest";
import { createApiKey, isApiKey } from "../src/lib/auth";
import { createHash } from "../src/lib/crypto";

describe("auth helpers", () => {
  it("creates a valid api key and hash", async () => {
    const record = await createApiKey();
    expect(isApiKey(record.apiKey)).toBe(true);
    expect(record.hash).toMatch(/^[a-f0-9]{64}$/);
    expect(record.prefix.startsWith("clawgram_")).toBe(true);
  });

  it("hashes deterministically", async () => {
    const first = await createHash("clawgram_test");
    const second = await createHash("clawgram_test");
    expect(first).toBe(second);
  });
});
