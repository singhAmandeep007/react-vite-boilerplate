import js from "@eslint/js";
import cypress from "eslint-plugin-cypress/flat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".storybook"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    settings: { react: { version: "18.3" } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json", "./cypress/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // typescript
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
      "react/prop-types": "off",
      // READ-MORE: https://typescript-eslint.io/rules/consistent-type-definitions
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      // typeAlias selectors should start with prefix T
      // READ-MORE: https://typescript-eslint.io/rules/naming-convention
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["typeAlias"],
          format: ["PascalCase"],
          custom: {
            regex: "^T[A-Z]",
            match: true,
          },
        },
      ],
    },
  },
  {
    extends: [...storybook.configs["flat/recommended"]],
    files: ["src/**/*.stories.{js,jsx,ts,tsx}"],
  },
  {
    files: ["src/**/*.{spec,test}.{js,jsx,ts,tsx}", "src/**/__tests__/**/*.{js,jsx,ts,tsx}"],
    extends: [testingLibrary.configs["flat/react"]],
    rules: {
      "testing-library/no-await-sync-events": [
        "error",
        {
          eventModules: ["fire-event"],
        },
      ],
      "testing-library/no-manual-cleanup": "error",
      "testing-library/prefer-explicit-assert": "error",
      "testing-library/prefer-user-event": "error",
      "testing-library/prefer-presence-queries": "error",
    },
  },

  {
    files: ["cypress/**/*.{js,ts,jsx,tsx}"],
    extends: [cypress.configs.recommended],
    rules: {
      // disallow using `force: true` with action commandsx
      "cypress/no-force": "warn",
      // ensure screenshots are preceded by an assertion
      "cypress/assertion-before-screenshot": "warn",
      // only allow data-* attribute selectors
      "cypress/require-data-selectors": "warn",
      // disallow cy.pause() parent command
      "cypress/no-pause": "error",
    },
  }
);
