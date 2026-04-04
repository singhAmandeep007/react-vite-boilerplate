# @singhamandeep/crvb

## 1.1.2

### Patch Changes

- [#11](https://github.com/singhAmandeep007/react-vite-boilerplate/pull/11) [`c837d1d`](https://github.com/singhAmandeep007/react-vite-boilerplate/commit/c837d1d3878205bc38d67b6404967de670fb5d98) Thanks [@singhAmandeep007](https://github.com/singhAmandeep007)! - remove cypress report from vcs

## 1.1.1

### Patch Changes

- [#9](https://github.com/singhAmandeep007/react-vite-boilerplate/pull/9) [`7e4ddc2`](https://github.com/singhAmandeep007/react-vite-boilerplate/commit/7e4ddc249334eb6ff9d8a19c62b7451bae20e3fe) Thanks [@singhAmandeep007](https://github.com/singhAmandeep007)! - Configure Cypress HTML reporting

## 1.1.0

### Minor Changes

- [#7](https://github.com/singhAmandeep007/react-vite-boilerplate/pull/7) [`fec3950`](https://github.com/singhAmandeep007/react-vite-boilerplate/commit/fec3950734275b5f73e9e5512a0978b97ef744f1) Thanks [@singhAmandeep007](https://github.com/singhAmandeep007)! - Bug Fixes & Tooling Improvements

  Storybook & MSW Testing Integration (vitest.config.ts & Dependencies)

  Resolved missing dependency issue: Encountered an issue where Vite's pre-bundling could not resolve msw-storybook-addon. Re-running .nvm with npm install verified and downloaded the missing dependencies correctly.
  Fixed Environment Variable scope for Vitest: Storybook unit tests (tests:storybook) were previously encountering a Failed to construct 'URL': Invalid URL error via env.ts. We resolved this by explicitly injecting the env argument (loaded via Vite's loadEnv) into the storybook testing project scope in vitest.config.ts. Now, variables like VITE_API_URL correctly initialize during playwright execution headless testing. 2. CLI Hanging Fix (packages/crvb/bin/create.js)

  Explicit Exit Signal: Fixed an issue where the boilerplate scaffolding command (npx @singhamandeep/crvb) would hang indefinitely after successfully creating the project folders. Added a process.exit(0) at the end of the try block to explicitly kill remaining background event loops (like degit and prompts) once scaffolding completes. 3. CI/CD Release Automation (.changeset)

  Added proper changeset: Found that the GitHub Action (changesets/action@v1) wasn't triggering automated version bumps on the main branch because there were no unreleased .md files detailing the patch updates. Added a changeset to trigger a "Version Packages" PR which will allow the correct version bump from 1.0.1 to 1.0.2 on the npm registry.

## 1.0.1

### Patch Changes

- [#2](https://github.com/singhAmandeep007/react-vite-boilerplate/pull/2) [`2c35d24`](https://github.com/singhAmandeep007/react-vite-boilerplate/commit/2c35d24faf520e16e9b4fa1da8f40e1987d53660) Thanks [@singhAmandeep007](https://github.com/singhAmandeep007)! - Rename package from `@singhamandeep/crvb` to unscoped `crvb`. Users can now scaffold directly with `npx crvb@latest my-app`.

## 1.0.0

### Major Changes

- [`adca410`](https://github.com/singhAmandeep007/react-vite-boilerplate/commit/adca410afbb112cbf28410fae349f2f076a3df3b) Thanks [@singhAmandeep007](https://github.com/singhAmandeep007)! - Release 1.0.0: first stable public release of the CLI scaffold tool.
  - The scaffold command is now published as `@singhamandeep/crvb`.
  - Use `npx @singhamandeep/crvb@latest my-app` to create projects.
  - Added a dedicated npm CLI package for scaffolding.
  - Added release automation with Changesets + GitHub Actions.
  - Added Storybook test project integration and accessibility enforcement in tests.
  - Added repository docs for publishing, release flow, and script usage.
