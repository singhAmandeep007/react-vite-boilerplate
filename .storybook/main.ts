import type { StorybookConfig } from "@storybook/react-vite";

// NOTE: defines your Storybook project's behavior, including the location of your stories, the addons you use, feature flags and other project-specific settings.
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  // addons are plugins that extend Storybook's core functionality.
  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  docs: {
    defaultName: "Documentation"
  },
};
export default config;
