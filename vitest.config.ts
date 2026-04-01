import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { loadEnv } from "vite";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig(() => {
  const env = loadEnv("test", process.cwd() + "/env");

  return {
    test: {
      projects: [
        {
          extends: true as const,
          test: {
            name: "unit",
            root: "./src",
            env,
            // use APIs globally like jest
            // READ-MORE: https://vitest.dev/config/#globals
            globals: false,
            // https://vitest.dev/config/#environment
            environment: "jsdom",
            exclude: [...configDefaults.exclude, "**/cypress/**"],
            setupFiles: ["./tests/setup.ts"],
            testTimeout: 5000,
            // READ-MORE: https://vitest.dev/config/#css
            css: {
              modules: {
                // process CSS files and do not hash class names
                // READ-MORE: https://vitest.dev/config/#css-modules-classnamestrategy
                classNameStrategy: "non-scoped" as const,
              },
              // READ-MORE: https://vitest.dev/config/#css-include
              include: /\.(scss|sass|css)$/,
            },
            // write tests for your types
            // NOTE: by default all tests inside `*.test-d.ts` files are considered type tests
            // READ-MORE: https://vitest.dev/guide/testing-types.html
            typecheck: {
              enabled: true,
            },
            // teardown
            // Calls mockClear (Clears all information about every call) before every test. This will clear mock history and reset its implementation to an empty function (will return undefined). Completely reset a mock to the default state.
            // READ-MORE: https://vitest.dev/config/#mockreset
            mockReset: true,

            // extra
            logHeapUsage: true,
            // READ-MORE: https://vitest.dev/config/#coverage
            coverage: {
              provider: "v8",
              reporter: ["html"],
              reportsDirectory: "../reports/unit/coverage",
              exclude: ["*services/mocker", "*tests", "*types", "*__mocks__", "*assets"],
            },
          },
        },
        {
          extends: true as const,
          optimizeDeps: {
            include: [
              "storybook/test",
              "react/jsx-dev-runtime",
              "@radix-ui/react-slot",
              "class-variance-authority",
              "tailwind-merge",
              "clsx",
              "@storybook/addon-themes",
              "@storybook/addon-docs",
              "@storybook/react-dom-shim",
            ],
          },
          plugins: [
            storybookTest({
              configDir: ".storybook",
              disableAddonDocs: true,
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: "chromium" as const }],
            },
          },
        },
      ],
    },
  };
});
