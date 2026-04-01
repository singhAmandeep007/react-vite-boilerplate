import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import dotenv from "dotenv";
import path from "path";

const env = dotenv.config({ path: path.resolve("./env/.env.test") }).parsed;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", vitePreprocessor());
    },
    baseUrl: "http://localhost:9001",
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",

    env: {
      ...env,
    },
  },
});
