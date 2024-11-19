import { createFileRoute, redirect } from "@tanstack/react-router";

import { AppLayout } from "../pages/App";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.user) {
      redirect({
        to: "/auth/login",
        throw: true,
      });
    }
  },

  component: AppLayout,
});
