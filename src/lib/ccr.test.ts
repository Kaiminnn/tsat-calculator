import { describe, expect, it } from "vitest";
import { calculateCcr } from "./ccr";

describe("calculateCcr", () => {
  it("calculates male CCr and formats it to one decimal place", () => {
    const result = calculateCcr("60", "70", "1.0", "male");

    expect(result.ok).toBe(true);
    expect(result.formatted).toBe("77.8");

    if (result.ok) {
      expect(result.value).toBeCloseTo(77.77777777777777);
    }
  });

  it("calculates female CCr and formats it to one decimal place", () => {
    const result = calculateCcr("60", "70", "1.0", "female");

    expect(result.ok).toBe(true);
    expect(result.formatted).toBe("66.1");

    if (result.ok) {
      expect(result.value).toBeCloseTo(66.11111111111111);
    }
  });

  it("rejects empty values", () => {
    expect(calculateCcr("", "70", "1.0", "male")).toEqual({
      ok: false,
      message: "Age is required.",
    });
  });

  it("rejects non-numeric values", () => {
    expect(calculateCcr("abc", "70", "1.0", "male")).toEqual({
      ok: false,
      message: "Age must be a number.",
    });
  });

  it("rejects values that are 0 or less", () => {
    expect(calculateCcr("60", "-1", "1.0", "male")).toEqual({
      ok: false,
      message: "Weight must be greater than 0.",
    });
  });

  it("rejects age of 140 or greater", () => {
    expect(calculateCcr("140", "70", "1.0", "male")).toEqual({
      ok: false,
      message: "Age must be less than 140.",
    });
  });

  it("rejects serum creatinine of 0", () => {
    expect(calculateCcr("60", "70", "0", "male")).toEqual({
      ok: false,
      message: "Serum creatinine must be greater than 0.",
    });
  });
});
