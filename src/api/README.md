# src/api

The `api` directory is organized into folders of related API endpoints. Each folder may contains it's services, validation schema using `zod`, request and response payloads types and hooks.

Hooks can contain `ky` hooks or `react query` hooks.

## Example:

- api/auth/
  - auth.service.ts
  - auth.types.ts
  - auth.hooks.ts
  - auth.ky.hooks.ts
  - index.ts
