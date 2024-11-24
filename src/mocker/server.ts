import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

export const runServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
  });
};
