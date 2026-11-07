import { describe, expect, it } from "vitest";

describe("toolchain", () => {
  it("supports ES2023 immutable array methods", () => {
    const original = [3, 1, 2];
    const sorted = original.toSorted((a, b) => a - b);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
