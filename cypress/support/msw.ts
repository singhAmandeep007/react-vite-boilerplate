import { RequestHandler } from "msw";
import { setupWorker, type SetupWorker } from "msw/browser";

import { handlers } from "../../src/lib/mocker/handlers";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      interceptMswRequest(...handlers: RequestHandler[]): void;
    }
  }
}

let mswWorker: SetupWorker;

before(() => {
  // NOTE: if using msw, setup the msw worker
  mswWorker = setupWorker(...handlers);

  cy.wrap(
    mswWorker.start({
      onUnhandledRequest: "bypass",
    }),
    { log: true }
  );
});

// NOTE: before each test, reset the handlers, if using msw
// Fires before the test and all before and beforeEach hooks run.
Cypress.on("test:before:run", () => {
  if (mswWorker) {
    mswWorker.resetHandlers();
  }
});

// NOTE: custom commands to explicitly intercept the request
Cypress.Commands.add("interceptMswRequest", (...handlers: RequestHandler[]) => {
  if (!mswWorker) throw new Error("MSW worker is not initialized");
  mswWorker.use(...handlers);
});
