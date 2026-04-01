# Storybook

This directory contains Storybook configuration for the project.

## Available Commands

```sh
npm run storybook
npm run storybook:build
npm run test:storybook
```

## What's Configured

- Framework: `@storybook/react-vite`
- Stories: `../src/**/*.mdx` and `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Addons:
  - `@storybook/addon-links`
  - `@storybook/addon-themes`
  - `@storybook/addon-a11y`
  - `@storybook/addon-docs`
  - `@storybook/addon-vitest`

## Accessibility Testing

Accessibility checks are enabled in Storybook tests and are configured to fail on violations:

- `a11y.test = "error"`

This behavior is configured in `preview.ts`.

## Theme Setup

Theme switching is configured with `withThemeByClassName`:

- `light` theme class
- `dark` theme class
- default theme: `light`

## Key Files

- `main.ts` - Story source patterns, addons, framework options
- `preview.ts` - Global parameters, a11y behavior, decorators
- `vite.config.ts` - Storybook builder-specific Vite config
