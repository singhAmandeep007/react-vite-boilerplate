---
"@singhamandeep/crvb": minor
---

Bug Fixes & Tooling Improvements

Storybook & MSW Testing Integration (vitest.config.ts & Dependencies)

Resolved missing dependency issue: Encountered an issue where Vite's pre-bundling could not resolve msw-storybook-addon. Re-running .nvm with npm install verified and downloaded the missing dependencies correctly.
Fixed Environment Variable scope for Vitest: Storybook unit tests (tests:storybook) were previously encountering a Failed to construct 'URL': Invalid URL error via env.ts. We resolved this by explicitly injecting the env argument (loaded via Vite's loadEnv) into the storybook testing project scope in vitest.config.ts. Now, variables like VITE_API_URL correctly initialize during playwright execution headless testing. 2. CLI Hanging Fix (packages/crvb/bin/create.js)

Explicit Exit Signal: Fixed an issue where the boilerplate scaffolding command (npx @singhamandeep/crvb) would hang indefinitely after successfully creating the project folders. Added a process.exit(0) at the end of the try block to explicitly kill remaining background event loops (like degit and prompts) once scaffolding completes. 3. CI/CD Release Automation (.changeset)

Added proper changeset: Found that the GitHub Action (changesets/action@v1) wasn't triggering automated version bumps on the main branch because there were no unreleased .md files detailing the patch updates. Added a changeset to trigger a "Version Packages" PR which will allow the correct version bump from 1.0.1 to 1.0.2 on the npm registry.
