import { createFileRoute, redirect } from "@tanstack/react-router";
import { Home } from "../pages/Home";

import { Footer, Navbar } from "../components/layout";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: () => (
    <>
      <main>
        <Navbar />
        <Home />
      </main>
      <Footer />
    </>
  ),
});
