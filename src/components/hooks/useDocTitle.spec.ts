import { ParsedLocation, useLocation } from "@tanstack/react-router";
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDocTitle } from "./useDocTitle";

// mock dependencies
vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@tanstack/react-router")>()),
  useLocation: vi.fn(),
}));

vi.mock("../../utils", () => ({
  getEnvValue: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useDocTitle", () => {
  it("should set document title based on pathname", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/user-profile" } as ParsedLocation);

    renderHook(() => useDocTitle({ deps: [], options: {} }));

    expect(document.title).toBe("User Profile");
  });

  it("should use defaultTitle when pathname is root", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/" } as ParsedLocation);
    const defaultTitle = "My App";

    renderHook(() =>
      useDocTitle({
        deps: [],
        options: { defaultTitle },
      })
    );

    expect(document.title).toBe(defaultTitle);
  });

  it("should use titleMap when provided", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/dashboard" } as ParsedLocation);
    const titleMap = { dashboard: "Custom Dashboard Title" };

    renderHook(() =>
      useDocTitle({
        deps: [],
        options: { titleMap },
      })
    );

    expect(document.title).toBe("Custom Dashboard Title");
  });

  it("should use full path mapping from titleMap when available", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/users/settings" } as ParsedLocation);
    const titleMap = { "users/settings": "User Settings Page" };

    renderHook(() =>
      useDocTitle({
        deps: [],
        options: { titleMap },
      })
    );

    expect(document.title).toBe("User Settings Page");
  });

  it("should not capitalize when capitalize option is false", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/user-profile" } as ParsedLocation);

    renderHook(() =>
      useDocTitle({
        deps: [],
        options: { capitalize: false },
      })
    );

    expect(document.title).toBe("user profile");
  });

  it("should restore previous title on unmount", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/dashboard" } as ParsedLocation);
    const previousTitle = "Previous Title";
    vi.spyOn(document, "title", "get").mockImplementationOnce(() => previousTitle);

    const { unmount } = renderHook(() => useDocTitle({ deps: [], options: {} }));

    expect(document.title).toBe("Dashboard");

    unmount();

    expect(document.title).toBe(previousTitle);
  });

  it("should update title when location changes", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/dashboard" } as ParsedLocation);

    const { rerender } = renderHook(() => useDocTitle({ deps: [], options: {} }));
    expect(document.title).toBe("Dashboard");

    vi.mocked(useLocation).mockReturnValue({ pathname: "/settings" } as ParsedLocation);
    rerender();

    expect(document.title).toBe("Settings");
  });
});
