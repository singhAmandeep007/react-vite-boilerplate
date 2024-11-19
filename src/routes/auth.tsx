import { createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout } from "../pages/Auth/AuthLayout";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ context }) => {
    if (context.auth?.user) {
      redirect({
        to: "/app",
        throw: true,
      });
    }
  },
  component: AuthLayout,
});
