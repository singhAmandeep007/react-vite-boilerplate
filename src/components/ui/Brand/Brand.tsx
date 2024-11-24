import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RouteLink } from "../RouteLink";

import { cn } from "../../../utils";

import Logo from "../../../assets/logo.svg?react";

export type TBrandProps = { className?: string };

export const Brand: FC<TBrandProps> = ({ className }) => {
  const { t } = useTranslation("common");

  return (
    <RouteLink
      to="/"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <Logo className="h-8 w-8" />
      <span className="sr-only">{t("app.appName")}</span>
    </RouteLink>
  );
};
