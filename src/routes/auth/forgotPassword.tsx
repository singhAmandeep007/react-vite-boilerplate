import { createFileRoute } from "@tanstack/react-router";

import { ForgotPassword } from "../../pages/Auth";

export const Route = createFileRoute("/auth/forgotPassword")({
  component: ForgotPassword,
});
