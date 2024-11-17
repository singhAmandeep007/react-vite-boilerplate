import { FC, PropsWithChildren } from "react";

import { useTranslation } from "react-i18next";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "..";
import { Brand, Button, LangToggler, RouteLink, ThemeToggler } from "../../ui";

export type TNavbarProps = Record<string, never>;

export const Navbar: FC<PropsWithChildren<TNavbarProps>> = () => {
  const { t } = useTranslation("common");

  return (
    <header className="sticky top-0 z-[--z-navbar] flex h-[--navbar-height] items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Brand />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Brand className="justify-start" />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <RouteLink to="/auth/login">
          <Button>{t("login")}</Button>
        </RouteLink>

        <ThemeToggler />
        <LangToggler />
      </div>
    </header>
  );
};
