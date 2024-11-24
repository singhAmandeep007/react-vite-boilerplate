import { Moon, Sun } from "lucide-react";

import { Button } from "../Button";

import { useTheme } from "./context";
import { THEME } from "./theme.types";

export const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Change theme"
      onClick={() => setTheme(theme === THEME.light ? THEME.dark : THEME.light)}
      data-testid="theme-toggler"
    >
      <Sun className="icon rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="icon absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">change theme</span>
    </Button>
  );
};
