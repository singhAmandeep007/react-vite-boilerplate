export const THEME = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export const THEME_VALUES = Object.values(THEME);

export type TTheme = (typeof THEME)[keyof typeof THEME];
