import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "../components/ui/ThemeToggler";

import { Toaster } from "../components/ui/Toast";
import { TooltipProvider } from "../components/ui/Tooltip";

import { TanStackReactQueryDevelopmentTools } from "../components/utils";

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
