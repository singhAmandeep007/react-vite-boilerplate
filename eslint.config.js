import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "!.storybook"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
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
  }
);
