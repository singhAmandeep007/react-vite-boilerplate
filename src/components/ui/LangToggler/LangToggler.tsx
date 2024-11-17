import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Button } from "../Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../DropdownMenu";

import { LANGS_VALUES, TLangsValues } from "../../../modules/i18n/consts";

export function LangToggler() {
  const { t, i18n } = useTranslation("common", { keyPrefix: "lang" });

  const [currentLang, setCurrentLang] = useState<TLangsValues>(i18n.resolvedLanguage as TLangsValues);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function changeLanguage(lang: TLangsValues) {
      await i18n.changeLanguage(lang);
    }

    changeLanguage(currentLang).catch(console.error);
  }, [currentLang, i18n]);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMenuTrigger
        asChild
        data-testid="lang-toggler"
      >
        <Button
          variant="outline"
          size="icon"
        >
          <Languages className="icon" />
          <span className="sr-only">{t("iconLabel")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        onInteractOutside={() => setIsOpen(false)}
        data-testid="lang-toggler-menu"
      >
        {LANGS_VALUES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setCurrentLang(lang)}
            className={lang === currentLang ? "text-primary" : ""}
          >
            {t(lang)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
