import { describe, expect, it } from "vitest";
import { formatLocaleDate } from "./date";

describe("formatLocaleDate", () => {
  it("should format the date in the specified locale", () => {
    const date = new Date("2022-02-01");
    const result = formatLocaleDate(date, "en-US");
    expect(result).toEqual("02/01/2022");
  });

  it("should handle different locales", () => {
    const date = new Date("2022-02-01");
    const result = formatLocaleDate(date, "fr-FR");
    expect(result).toEqual("01/02/2022");
  });
});
