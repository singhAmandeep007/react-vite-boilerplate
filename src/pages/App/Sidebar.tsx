import { FC, PropsWithChildren } from "react";

import { Brand, RouteLink, Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui";

import { Home, Settings } from "lucide-react";

export type TSidebarProps = Record<string, never>;

export const Sidebar: FC<PropsWithChildren<TSidebarProps>> = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-[--z-navbar] hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Brand />
        <Tooltip>
          <TooltipTrigger>
            <RouteLink
              to="/app/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Home className="icon" />
              <span className="sr-only">Dashboard</span>
            </RouteLink>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger>
            <RouteLink
              to="/app/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Settings className="icon" />
              <span className="sr-only">Settings</span>
            </RouteLink>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
