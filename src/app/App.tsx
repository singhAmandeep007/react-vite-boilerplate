import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { TanStackReactQueryDevelopmentTools } from "../components/developmentTools";
import { ThemeProvider, Toaster, TooltipProvider } from "../components/ui";

import { AuthProvider, useAuth } from "./auth";
import { queryClient, router } from "./router";

const Router = () => {
  const auth = useAuth();
  return (
    <RouterProvider
      router={router}
      context={{ queryClient, auth }}
    />
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackReactQueryDevelopmentTools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
      <ThemeProvider>
        <Toaster />
        <TooltipProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
