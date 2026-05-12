import { describe, expect, it } from "vitest";
import { calculateTsat } from "./tsat";

describe("calculateTsat", () => {
  it("calculates TSAT and formats it to one decimal place", () => {
    expect(calculateTsat("80", "320")).toEqual({
      ok: true,
      value: 25,
      formatted: "25.0",
    });
  });

  it("rejects empty serum iron", () => {
    expect(calculateTsat("", "320")).toEqual({
      ok: false,
      message: "Serum iron is required.",
    });
  });

  it("rejects empty TIBC", () => {
    expect(calculateTsat("80", "")).toEqual({
      ok: false,
      message: "TIBC is required.",
    });
  });

  it("rejects non-numeric values", () => {
    expect(calculateTsat("abc", "320")).toEqual({
      ok: false,
      message: "Serum iron must be a number.",
    });
  });

  it("rejects values that are 0 or less", () => {
    expect(calculateTsat("-1", "320")).toEqual({
      ok: false,
      message: "Serum iron must be greater than 0.",
    });
  });

  it("rejects TIBC of 0", () => {
    expect(calculateTsat("80", "0")).toEqual({
      ok: false,
      message: "TIBC must be greater than 0.",
    });
  });
});
