import { setupServer } from "msw/node";

import { afterAll, afterEach, beforeAll } from "vitest";

// WHY: We need to import the handlers directly from the lib/mocker/handlers file as if we import from index.ts, it will cause vite attempting to import the browser version of msw causing error.
import { handlers } from "../lib/mocker/handlers";

export const createTestMswServer = (logging = false) => {
  const testMswServer = setupServer(...handlers);

  beforeAll(() => {
    testMswServer.listen({
      onUnhandledRequest(request) {
        console.log("Unhandled %s %s", request.method, request.url);
      },
    });
  });

  afterEach(() => {
    testMswServer.resetHandlers();
  });

  afterAll(() => {
    testMswServer.close();
  });

  if (logging) {
    // NOTE: simple outgoing request listener logger
    testMswServer.events.on("request:start", ({ request }) => {
      console.log("MSW intercepted:", request.method, request.url);
    });
  }

  return testMswServer;
};

export { http, HttpResponse } from "msw";
