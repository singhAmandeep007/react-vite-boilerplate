/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import { configDefaults } from "vitest/config";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";
import inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";

// READ-MORE: https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() + "/env");

  const isDevMode = mode === "development";
  const isProdMode = mode === "production";
  const isTestMode = process.env.VITEST === "true";

  const shouldCheckESLintDev = isDevMode && JSON.parse(env.VITE_ESLINT_DEV_CHECK) ? true : false;
  const shouldCheckTypeScriptDev = isDevMode && JSON.parse(env.VITE_TSC_DEV_CHECK) ? true : false;

  const plugins = [svgr(), !isTestMode && TanStackRouterVite(), react(), inspect()];
  if (!isTestMode) {
    // READ-MORE: https://github.com/fi3ework/vite-plugin-checker
    plugins.push(
      checker({
        typescript: shouldCheckTypeScriptDev,
        ...(shouldCheckESLintDev
          ? {
              eslint: {
                lintCommand:
                  'eslint --report-unused-disable-directives --max-warnings 5 "{src,cypress}/**/*.{js,jsx,ts,tsx}"',
                useFlatConfig: true,
              },
            }
          : {}),
      })
    );
  }
  if (isProdMode) {
    plugins.push(
      visualizer({
        template: "treemap",
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "./reports/build/analyze.html", // will be saved in project's root
      })
    );
  }

  return {
    server: {
      port: 9001,
      strictPort: true,
      open: true,
      fs: {
        cachedChecks: false,
      },
    },
    preview: {
      port: 5001,
      strictPort: true,
      open: true,
    },
    base: "/react-vite-boilerplate/",
    envDir: "./env",
    plugins,
    build: {
      outDir: "dist",
      sourcemap: true,
      // READ-MORE:  https://vitejs.dev/config/build-options#build-target
      target: "esnext",
    },
    test: {
      root: "./src",
      env: loadEnv("test", process.cwd() + "/env"),
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
          classNameStrategy: "non-scoped",
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
  };
});
