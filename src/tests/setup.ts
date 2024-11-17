import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

import { initTestI18n } from "./initTestI18n";

// to make it works like Jest (auto-mocking);
vi.mock("zustand");
vi.mock("react-dom");

beforeAll(async () => {
  await initTestI18n();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  cleanup();
});

// Mocking the matchMedia API
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
