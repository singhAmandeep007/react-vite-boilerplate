# src/lib/api

The `api` directory is organized into folders of related API endpoints. Each folder may contains instance, validation schema using `zod`, request and response payloads types and api hooks.

Hooks can contain `ky` hooks or `react query` hooks.

## Example:

- api/auth/
  - auth.instance.ts
  - auth.types.ts
  - auth.hooks.ts
  - auth.ky.hooks.ts
  - index.ts
