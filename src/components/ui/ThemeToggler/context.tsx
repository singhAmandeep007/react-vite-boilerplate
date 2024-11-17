import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

import { type TTheme } from "../../../lib/config/theme";

export type TThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: TTheme;
  storageKey?: string;
};

export type TThemeProviderState = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeProviderContext = createContext<TThemeProviderState | null>(null);

export const ThemeProvider = ({ children, defaultTheme = "system", storageKey = "ui-theme" }: TThemeProviderProps) => {
  const [theme, setTheme] = useState<TTheme>(() => (localStorage.getItem(storageKey) as TTheme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: useCallback(
      (theme: TTheme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
      [storageKey]
    ),
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
