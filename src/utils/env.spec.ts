import { afterEach, describe, expect, it, vi } from "vitest";
import { apiURL } from "./env";

describe("env", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return the URL with the given path prefixed", () => {
    const apiUrl = "https://example.com/api/v1/";

    vi.stubEnv("VITE_API_URL", apiUrl);

    expect(apiURL("users").toString()).toBe("https://example.com/api/v1/users");
  });

  it("should return the URL when path is empty", () => {
    const apiUrl = "https://host.com/api/v1/";

    vi.stubEnv("VITE_API_URL", apiUrl);

    expect(apiURL().toString()).toBe(apiUrl);
  });
});
