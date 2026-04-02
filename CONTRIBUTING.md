# Contributing

Thanks for your interest in contributing to React Vite Boilerplate!

## Table of Contents

- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Changesets and Releases](#changesets-and-releases)
- [Complete Example: Adding a Feature](#complete-example-adding-a-feature)
- [Pull Request Expectations](#pull-request-expectations)

## Quick Start

1. Fork this repository and clone your fork.
2. Create a branch from `main`:

```sh
git checkout -b feat/my-feature
```

3. Install dependencies:

```sh
npm install
```

4. Run quality checks locally before pushing:

```sh
npm run lint
npm run tsc:check
npm run test:unit
npm run test:storybook
```

5. Open a pull request targeting `main`.

## Development Workflow

### Branch Naming

Use [conventional branch names](https://www.conventionalcommits.org/) for clarity:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New feature | `feat/add-dark-mode-toggle` |
| `fix/` | Bug fix | `fix/login-redirect-loop` |
| `docs/` | Documentation only | `docs/update-api-examples` |
| `chore/` | Tooling, deps, CI | `chore/upgrade-vite-7` |
| `refactor/` | Code restructuring | `refactor/extract-auth-hook` |

### Commit Messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint. Use `npm run commit` for an interactive prompt that generates the correct format:

```sh
git add .
npm run commit
```

Or write manually:

```
feat: add dark mode toggle to settings page
fix: prevent redirect loop on expired session
docs: update scaffold CLI usage examples
```

### Running Checks Locally

Before pushing, run the same checks that CI will enforce:

```sh
# Linting
npm run lint

# Type checking
npm run tsc:check

# Unit tests
npm run test:unit

# Storybook component tests
npm run test:storybook

# E2E tests (optional, runs in CI)
npm run test:e2e:headless
```

## Changesets and Releases

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation. **If your change affects the published CLI package (`@singhamandeep/crvb`), you must include a changeset.**

### When to Add a Changeset

| Change | Changeset needed? | Bump type |
|--------|--------------------|-----------|
| Fix a bug in the scaffold CLI | ✅ Yes | `patch` |
| Add a new CLI prompt option | ✅ Yes | `minor` |
| Change the scaffold output structure | ✅ Yes | `major` |
| Update boilerplate app code (components, styles) | ✅ Yes | `patch` |
| Fix a typo in README | ❌ No | — |
| Update devDependencies | ❌ No | — |
| Update CI workflows | ❌ No | — |

### How to Create a Changeset

```sh
npm run changeset
```

The interactive prompt will:

1. Ask which package to bump → select `@singhamandeep/crvb`.
2. Ask for bump type → choose `patch`, `minor`, or `major`.
3. Ask for a summary → write a clear description of what changed.

This creates a markdown file in `.changeset/` (e.g., `.changeset/happy-dogs-fly.md`):

```markdown
---
"@singhamandeep/crvb": minor
---

Add `--typescript` flag to scaffold with strict TypeScript configuration.
```

> **Tip**: You can edit the generated file directly if you want to refine the summary.

### What Happens After Merging

1. You merge your PR to `main`.
2. The [release workflow](.github/workflows/release.yml) detects the changeset.
3. It creates (or updates) a **Release PR** with:
   - Version bump in `packages/crvb/package.json`
   - Updated `CHANGELOG.md` with your summary
4. When the Release PR is merged:
   - The package is published to npm automatically.
   - A GitHub Release is created.

## Complete Example: Adding a Feature

Here's a real-world walkthrough of adding a new prompt option to the scaffold CLI.

### 1. Create a Feature Branch

```sh
git checkout main
git pull origin main
git checkout -b feat/add-typescript-strict-option
```

### 2. Make Your Changes

Edit `packages/crvb/bin/create.js` to add a new prompt:

```js
// Add after the existing prompts
{
  type: "toggle",
  name: "strictTs",
  message: "Enable strict TypeScript configuration?",
  initial: true,
  active: "yes",
  inactive: "no",
},
```

### 3. Run Quality Checks

```sh
npm run lint
npm run tsc:check
npm run test:unit
```

### 4. Add a Changeset

```sh
npm run changeset
```

Select:
- Package: `@singhamandeep/crvb`
- Bump: `minor` (new additive feature, backward compatible)
- Summary: `Add --typescript-strict flag to scaffold with strict TypeScript configuration`

### 5. Commit and Push

```sh
git add .
npm run commit
# Select: feat
# Scope: cli
# Description: add strict TypeScript configuration prompt
git push origin feat/add-typescript-strict-option
```

### 6. Open a Pull Request

Open a PR targeting `main`. The CI will:

- Run lint, typecheck, and tests.
- Verify the changeset is present.

### 7. After PR is Merged

The release workflow will:

1. Run quality checks (lint, typecheck, tests).
2. Detect the changeset and create a Release PR.
3. The Release PR will show:
   - Version bump: `1.0.1` → `1.1.0`
   - CHANGELOG entry with your summary.

### 8. Merge the Release PR

After reviewing, merge the Release PR. The workflow will:

1. Publish `@singhamandeep/crvb@1.1.0` to npm.
2. Create a GitHub Release with the changelog.

### 9. Verify

```sh
npm view @singhamandeep/crvb version
# → 1.1.0

npx @singhamandeep/crvb@latest test-app
# → Should show the new TypeScript strict prompt
```

## Pull Request Expectations

- **Keep PRs focused and small** — one feature or fix per PR.
- **Add or update docs** when behavior changes.
- **Include a changeset** when the change affects the published package.
- **Include tested output** if your change impacts scaffolding behavior.
- **Write clear commit messages** following the conventional format.
- **Ensure all checks pass** before requesting review.
