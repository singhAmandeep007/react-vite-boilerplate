import React from "react";
import { isProduction } from "../../modules/utils/utils";

export const ReactHookFormDevelopmentTools = isProduction
  ? (): null => null
  : React.lazy(() =>
      import("@hookform/devtools").then((result) => ({
        default: result.DevTool,
      }))
    );

export const TanStackRouterDevelopmentTools = isProduction
  ? (): null => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((result) => ({
        default: result.TanStackRouterDevtools,
      }))
    );

export const TanStackReactQueryDevelopmentTools = isProduction
  ? (): null => null
  : React.lazy(() =>
      import("@tanstack/react-query-devtools").then((result) => ({
        default: result.ReactQueryDevtools,
      }))
    );
