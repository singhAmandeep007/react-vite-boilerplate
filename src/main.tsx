import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";

import { i18n } from "./modules/i18n/index.ts";

import "./index.css";

async function setupApp() {
  await i18n.configure();

  if (import.meta.env.DEV) {
    const mocker = await import("./lib/mocker");

    mocker.runServer();
  }

  return Promise.resolve();
}

const root = createRoot(document.getElementById("root") as HTMLElement);

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
