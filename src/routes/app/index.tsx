import { createFileRoute } from "@tanstack/react-router";

import { Posts } from "../../pages/App";

export const Route = createFileRoute("/app/")({
  component: Posts,
});
