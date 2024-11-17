import { screens } from "tailwindcss/defaultTheme";

export const BREAKPOINTS: typeof screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
