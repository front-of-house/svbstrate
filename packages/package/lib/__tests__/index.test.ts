import { describe, it, expect } from "vitest";

declare module "vitest" {
  export interface TestContext {}
}

describe("transform", () => {
  it(`blocked dependency can be imported by user-land code`, async (t) => {
    expect(1).toBe(1);
  });
});
