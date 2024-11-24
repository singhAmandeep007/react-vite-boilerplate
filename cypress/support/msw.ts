import { RequestHandler } from "msw";
import { setupWorker, type SetupWorker } from "msw/browser";

import { handlers } from "../../src/mocker/handlers";

let mswWorker: SetupWorker;

before(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  mswWorker = setupWorker(...handlers);

  cy.wrap(
    mswWorker.start({
      onUnhandledRequest: "bypass",
    }),
    { log: true }
  );
});

// NOTE: before each test, reset the handlers to the initial state.
// fires before the test and all before and beforeEach hooks run.
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
