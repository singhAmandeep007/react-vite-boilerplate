/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";

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
  const isAnalyzeMode = process.env.ANALYZE === "true";

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
  if (isAnalyzeMode) {
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
        allow: [".."],
        cachedChecks: false,
      },
    },
    preview: {
      port: 5001,
      strictPort: true,
      open: true,
    },
    base: isProdMode ? "/react-vite-boilerplate/" : "/",
    envDir: "./env",
    plugins,
    build: {
      outDir: "dist",
      sourcemap: true,
      // READ-MORE:  https://vitejs.dev/config/build-options#build-target
      target: "esnext",
    },
  };
});
