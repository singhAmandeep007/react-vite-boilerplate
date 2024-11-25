import { setupWorker } from "msw/browser";

import { isProduction } from "../utils";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

const baseUrl = isProduction ? "https://singhamandeep.me/react-vite-boilerplate/" : "/";

export const runServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${baseUrl}mockServiceWorker.js`,
    },
  });
};
