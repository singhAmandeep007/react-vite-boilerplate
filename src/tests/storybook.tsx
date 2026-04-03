import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import type { ComponentType } from "react";
import { ThemeProvider, Toaster } from "../components/ui";

import { useMemo } from "react";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="flex min-h-[600px] items-center justify-center py-12">
        <Outlet />
      </div>
      <Toaster />
    </ThemeProvider>
  ),
});

/**
 * Storybook decorator that provides Tanstack Router and UI Toaster contexts.
 *
 * IMPORTANT: Import this directly from `tests/storybook` rather than via the `tests`
 * barrel file to prevent Vite from inadvertently trying to browser-bundle Node server
 * utilities (like MSW's setupServer) which causes build crashes.
 *
 * The `useMemo` inside prevents infinite re-rendering loops that would happen if
 * the router was recreated on every render of the RouterProvider.
 */
export const withRouterAndToaster = (Story: ComponentType) => {
  const RouterWrapper = () => {
    const router = useMemo(() => {
      const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: () => <Story />,
      });

      const routeTree = rootRoute.addChildren([indexRoute]);
      const memoryHistory = createMemoryHistory({
        initialEntries: ["/"],
      });

      return createRouter({ routeTree, history: memoryHistory });
    }, []);

    return <RouterProvider router={router} />;
  };

  return <RouterWrapper />;
};
