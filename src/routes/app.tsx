import { createFileRoute, redirect } from "@tanstack/react-router";

import { AppLayout } from "../pages/App";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },

  component: AppLayout,
});
