<!-- Copilot / AI agent instructions for contributors and automation -->

# Copilot instructions — react-vite-boilerplate

Keep this short and actionable. Reference key files for examples and patterns.

## Big picture

- App entry: [src/main.tsx](src/main.tsx) — sets up i18n, conditionally starts the local `mocker` in dev/production and then mounts `App`.
- App composition: [src/app/App.tsx](src/app/App.tsx) — wraps `Router`, `AuthProvider`, React Query and UI providers.
- Routing: [src/app/router.tsx](src/app/router.tsx) + [src/routeTree.gen.ts](src/routeTree.gen.ts) — uses TanStack Router and a generated route tree. Routes and types are defined via `routeTree.gen.ts`.
- API layer: [src/api/apiService.ts](src/api/apiService.ts) — `ApiService` wraps `ky`, sets `prefixUrl` from `apiURL()` and uses i18n for error messages.
- State: [src/store/store.ts](src/store/store.ts) — `zustand` with `persist` (sessionStorage), `devtools`, and custom `createSelectors` helpers. Store slices live under `src/store/*` (auth slice is `src/store/auth`).

## Key patterns and conventions

- Generated route tree: prefer editing route source files (under `src/routes/`) instead of hand-editing `routeTree.gen.ts`. The app relies on the generated file for type-safe routing.
- Mocking in-browser/server: `mocker.runServer()` is imported in `src/main.tsx` for dev/test environments; tests and local runs rely on MSW (see `public/mockServiceWorker.js` and `npm run init:msw`).
- API client: use the single `ApiService` instance pattern and extend it with `.extend()` for per-call headers/options rather than creating multiple ky instances.
- i18n: language and translation helpers are read from `src/modules/i18n` and used in services (e.g., API error messages). Keep translation keys consistent with `i18n.t(...)` usages.
- Store persistence: `STORE_NAME` and `STORE_VERSION` are authoritative; migrations should be implemented in `src/store/store.ts` `migrate` hook.

## Developer workflows (commands)

- Start dev server: `npm run dev` (Vite).
- Build: `npm run build` (runs `tsc -b` then `vite build`).
- Unit tests: `npm test` or `npm run test:unit` (Vitest).
- E2E (Cypress): `npm run test:e2e` (launches `dev:test` then Cypress). Use `npm run test:e2e:headless` for CI.
- Initialize MSW worker files (if updating handlers): `npm run init:msw`.

## Testing and debugging notes

- Unit tests rely on `src/tests/*` helpers and a test server `src/tests/testServer.ts`; follow existing patterns for `render` and `renderHook` helpers.
- E2E: Cypress config is at `cypress.config.js` and fixtures live under `cypress/fixtures`.
- If debugging API calls, check `src/mocker/handlers.ts` and `src/mocker/server.ts` (local mocking) before assuming production API issues.

## Where to make changes (examples)

- Add UI components under `src/components/ui` following existing folder structure and exports in `src/components/ui/index.ts`.
- Add pages under `src/pages/*` and corresponding route files under `src/routes/*` so the route generator picks them up.
- For global state, add a slice in `src/store/` and export selectors via `src/store/utils.ts` pattern.

## Quick notes for agents

- Prefer editing small focused files; preserve exports and index barrel files.
- When adding routes, update `src/routes/*` and run the route generation step if any (inspect repo scripts or README for generation step). If unsure, search for `routeTree.gen` usages.
- Refer to these canonical files for examples: [src/main.tsx](src/main.tsx), [src/app/App.tsx](src/app/App.tsx), [src/api/apiService.ts](src/api/apiService.ts), [src/store/store.ts](src/store/store.ts), [src/mocker/handlers.ts](src/mocker/handlers.ts).

## If unsure

- Ask the maintainers or open a draft PR; this repo uses conventional scripts (`dev`, `build`, `test`)—run them locally to validate changes.

---

## Examples

1. Add a route (preferred: create files under `src/routes/` so generator picks them up)

```tsx
// src/routes/MyPage.route.tsx
import { route } from "@tanstack/react-router";
import MyPage from "../../pages/My/MyPage";

export const myPageRoute = route({
  path: "/my",
  component: MyPage,
});
```

Then ensure the route is exported from the routes index where the generator expects it so it appears in `routeTree.gen.ts`.

2. Add a `zustand` store slice (follow `src/store/auth` pattern)

```ts
// src/store/mySlice.ts
import { StateCreator } from "zustand";

export type TMySlice = { count: number; inc: () => void };

export const createMySlice: StateCreator<TMySlice> = (set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
});
```

Compose into the app store by merging the slice in `src/store/store.ts` (same way `createAuthStore` is used) and expose selectors via `src/store/utils.ts`.

3. API client usage (common pattern in `src/api/*` services)

```ts
// src/api/user/user.service.ts (example)
import { ApiService, TApiServiceOptions } from "../apiService";

const apiService = new ApiService();

apiService.extend({ headers: { Authorization: "Bearer <token>" } });

export class UserService {
  private root = "users";

  getUser(id: string) {
    return apiService.get(`${this.root}/${id}`);
  }
}
```

Follow this pattern: create a single `ApiService` instance, call `.extend()` for request-specific options, and export domain services that call `get/post/patch/delete`.

4. Full route + page scaffold

```tsx
// src/routes/MyPage.route.tsx
import { route } from "@tanstack/react-router";
import MyPage from "../../pages/My/MyPage";

export const myPageRoute = route({
  path: "/my",
  component: MyPage,
});

// src/pages/My/MyPage.tsx
import React from "react";

const MyPage: React.FC = () => {
  return <div>My page content</div>;
};

export default MyPage;
```

Make sure the route file is exported from the routes index so the generator includes it in `routeTree.gen.ts`.
