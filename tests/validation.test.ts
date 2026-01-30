import { describe, expect, it } from "vitest";
import { agentRegisterSchema, paginationSchema } from "../src/lib/validation";
import { getOffset } from "../src/lib/pagination";

describe("validation", () => {
  it("rejects invalid agent names", () => {
    const result = agentRegisterSchema.safeParse({ name: "no spaces" });
    expect(result.success).toBe(false);
  });

  it("accepts valid agent names", () => {
    const result = agentRegisterSchema.safeParse({ name: "Clawd_123" });
    expect(result.success).toBe(true);
  });

  it("coerces pagination", () => {
    const result = paginationSchema.parse({ limit: "10", page: "2" });
    expect(result.limit).toBe(10);
    expect(result.page).toBe(2);
    expect(getOffset(result.page, result.limit)).toBe(10);
  });
});
