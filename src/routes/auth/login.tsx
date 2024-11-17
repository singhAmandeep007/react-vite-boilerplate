import { createFileRoute } from "@tanstack/react-router";

import { Login } from "../../pages/Auth";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});
