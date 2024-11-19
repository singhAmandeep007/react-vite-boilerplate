import Logo from "../../assets/taskList.png";

import { Outlet } from "@tanstack/react-router";
import { Footer, Navbar } from "../../components/layout";

export function AuthLayout() {
  return (
    <main>
      <Navbar />
      <div className="h-[--content-height] w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <Outlet />
        </div>
        <div className="hidden overflow-hidden bg-muted lg:block">
          <img
            src={Logo}
            alt="logo"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.9]"
            loading="lazy"
            decoding="async"
            style={{ color: "transparent" }}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
