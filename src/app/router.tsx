import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { isProduction } from "../utils";

export const queryClient = new QueryClient();

// set up a Router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: null,
    queryClient,
  },
  defaultPreload: "intent",
  // since we're using React Query, we don't want loader calls to ever be stale
  // this will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  basepath: isProduction ? "/react-vite-boilerplate/" : "/",
});

// register things for typesafety
declare module "@tanstack/react-router" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
