import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";

import { i18n } from "./modules/i18n";

import "./index.css";
import { isDevelopment, isProduction } from "./utils";

// to use Cypress.env in e2e environment
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Cypress?: { env: (key: string) => string };
  }
}

async function setupApp() {
  await i18n.configure();

  if (isDevelopment || isProduction) {
    const mocker = await import("./mocker/index.ts");

    await mocker.runServer();
  }

  return Promise.resolve();
}

const root = createRoot(document.getElementById("root")!);

setupApp()
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Something went wrong in setting up app", error);
  });
