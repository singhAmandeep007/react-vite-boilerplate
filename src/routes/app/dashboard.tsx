import { createFileRoute } from "@tanstack/react-router";

import { Dashboard } from "../../pages/App";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});
