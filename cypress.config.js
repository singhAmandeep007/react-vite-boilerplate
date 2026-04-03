import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import mochawesomeReporterPlugin from "cypress-mochawesome-reporter/plugin.js";
import dotenv from "dotenv";
import path from "path";

const env = dotenv.config({ path: path.resolve("./env/.env.test") }).parsed;

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress E2E Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesomeReporterPlugin(on);
      on("file:preprocessor", vitePreprocessor());
    },
    baseUrl: "http://localhost:9001",
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",

    env: {
      ...env,
    },
  },
});
