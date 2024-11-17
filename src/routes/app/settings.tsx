import { createFileRoute } from "@tanstack/react-router";

import { Settings } from "../../pages/App";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});
