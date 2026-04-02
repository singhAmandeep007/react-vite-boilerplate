# Contributing

Thanks for contributing.

## Quick Start

1. Fork this repository.
2. Create a branch from `main`.
3. Install dependencies with `npm install`.
4. Run checks locally:
   - `npm run lint`
   - `npm run tsc:check`
   - `npm run test:unit`
5. Open a pull request.

## Commit and Release Notes

This repository uses Changesets for release management.

When your change affects the published CLI package, add a changeset:

```sh
npm run changeset
```

Choose the `@singhamandeep/crvb` package and select patch/minor/major.

## Pull Request Expectations

- Keep pull requests focused and small.
- Add or update docs when behavior changes.
- If your change impacts scaffolding behavior, include tested command output in the PR description.
