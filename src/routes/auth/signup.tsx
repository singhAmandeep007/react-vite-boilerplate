import { createFileRoute } from "@tanstack/react-router";

import { Signup } from "../../pages/Auth";

export const Route = createFileRoute("/auth/signup")({
  component: Signup,
});
