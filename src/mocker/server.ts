import { setupWorker } from "msw/browser";

import { isProduction } from "../utils";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

const appBasePath = isProduction ? import.meta.env.BASE_URL : "/";

const serviceWorkerUrl = new URL(`.${appBasePath}mockServiceWorker.js`, window.location.origin).toString();

export const runServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: serviceWorkerUrl,
      options: {
        scope: appBasePath,
      },
    },
  });
};
