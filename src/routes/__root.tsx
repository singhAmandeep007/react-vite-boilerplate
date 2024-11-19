import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Fragment } from "react";

import { useDocTitle } from "../components/hooks";
import { TanStackRouterDevelopmentTools } from "../components/utils";

import { QueryClient } from "@tanstack/react-query";
import { TAuthStoreState } from "../lib/store";

type TRouterContext = {
  auth: TAuthStoreState | null;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<TRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  errorComponent: () => <div>Error</div>,
});

function RootComponent() {
  useDocTitle();

  return (
    <Fragment>
      <Outlet />
      <TanStackRouterDevelopmentTools
        position="bottom-left"
        initialIsOpen={false}
      />
    </Fragment>
  );
}
