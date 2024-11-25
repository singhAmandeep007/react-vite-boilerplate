import { Outlet } from "@tanstack/react-router";

import { Sidebar } from "./Sidebar";

import profileIcon from "../../assets/react.svg";

import { Footer, Sheet, SheetContent, SheetTrigger } from "../../components/layout";

import {
  Brand,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LangToggler,
  RouteLink,
  ThemeToggler,
} from "../../components/ui";

import { Input } from "../../components/forms";

import { PanelLeft, Search, Settings as SettingsIcon } from "lucide-react";

import { useAppLayout } from "./useAppLayout";

export const AppLayout = () => {
  const { handleLogout } = useAppLayout();

  return (
    <main>
      <div className="h-[calc(100dvh-var(--footer-height))]">
        <Sidebar />

        <div className="flex h-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-[--z-navbar] flex h-[--navbar-height] items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="sm:hidden"
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="sm:max-w-xs"
              >
                <nav className="grid gap-6 text-lg font-medium">
                  <Brand className="justify-start" />

                  <RouteLink
                    to="/app/settings"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <SettingsIcon className="icon" />
                    Settings
                  </RouteLink>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <div className="flex gap-1">
              <LangToggler />
              <ThemeToggler />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={profileIcon}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RouteLink to="/app/settings">Settings</RouteLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void handleLogout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <div className="grid flex-1 items-start gap-4 overflow-scroll p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
