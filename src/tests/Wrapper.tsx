import { FC, PropsWithChildren, ReactNode } from "react";

import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterHistory,
  RouterProvider,
} from "@tanstack/react-router";

import { Toaster } from "../components/ui/Toast";

import { afterEach, beforeEach } from "vitest";
import { ThemeProvider } from "../components/ui/ThemeToggler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProvider<T = any> = {
  Provider: FC<PropsWithChildren<T>>;
  props: Record<string, unknown>;
};

const addProviders = (providers: TProvider[] = [], component: ReactNode) => {
  if (!providers.length) {
    return component;
  }

  const [first, ...rest] = providers;

  const { Provider, props } = first;

  return <Provider {...props}>{addProviders(rest, component)}</Provider>;
};

export type TWrapperProps = {
  config?: {
    withToaster?: boolean;
    withRouter?: boolean;
  };
};

// tanstack router
let history: RouterHistory;
beforeEach(() => {
  history = createBrowserHistory();
});
afterEach(() => {
  history.destroy();
  window.history.replaceState(null, "root", "/");
});

export const Wrapper: FC<PropsWithChildren<TWrapperProps>> = ({
  children,
  config = {
    withToaster: true,
    withRouter: true,
  },
}) => {
  const providers: TProvider[] = [];

  providers.push({ Provider: ThemeProvider, props: {} });

  if (config?.withRouter) {
    const rootRoute = createRootRoute({
      component: Outlet,
    });

    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      // REFACTOR:
      component: () => children,
    });

    const routeTree = rootRoute.addChildren([indexRoute]);
    const router = createRouter({ routeTree, history });

    providers.push({
      Provider: RouterProvider,
      props: {
        router,
      },
    });
  }

  return (
    <>
      {addProviders(providers, children)}
      {config?.withToaster && <Toaster />}
    </>
  );
};
