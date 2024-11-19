import { RequestHandler } from "msw";

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      interceptMswRequest(...handlers: RequestHandler[]): void;
    }
  }
}
