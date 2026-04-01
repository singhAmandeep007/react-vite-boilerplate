import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { fetch, Headers, Request, Response } from "undici";
import { afterEach, beforeAll, vi } from "vitest";

import { initTestI18n } from "./initTestI18n";

// to make it works like Jest (auto-mocking);
vi.mock("zustand");
vi.mock("react-dom");

// Keep fetch/Request/AbortSignal constructors in the same runtime realm to avoid
// undici WebIDL brand-check errors during msw/node interception in Vitest+jsdom.
// Ref: https://github.com/mswjs/msw/issues/2165
// Ref: https://github.com/mswjs/msw/discussions/1934
const nativeAbortController = global.AbortController;
const nativeAbortSignal = global.AbortSignal;

Object.assign(global, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController: nativeAbortController,
  AbortSignal: nativeAbortSignal,
});

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
