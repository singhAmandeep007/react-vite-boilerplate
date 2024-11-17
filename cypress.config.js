import { defineConfig } from "cypress";
import dotenv from "dotenv";
import path from "path";

const env = dotenv.config({ path: path.resolve("./env/.env.test") }).parsed;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5001",
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",

    env: {
      ...env,
    },
  },
});
