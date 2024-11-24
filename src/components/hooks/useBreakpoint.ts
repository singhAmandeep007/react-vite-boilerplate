import { useMediaQuery } from "react-responsive";

import { BREAKPOINTS, TBreakpoint } from "../../config";

type TKeyAbove<K extends string> = `isAbove${Capitalize<K>}`;
type TKeyBelow<K extends string> = `isBelow${Capitalize<K>}`;

/**
 * Custom hook that returns breakpoint information based on the provided breakpoint key
 * @param breakpointKey - The key representing the desired breakpoint. Eg. "sm"
 * @returns An object containing the breakpoint value, and boolean flags indicating if the viewport is above or below the specified breakpoint.
 *
 * @example
 * const BREAKPOINTS = { sm: "576px", md: "768px" };
 * const { isBelowMd, isAboveMd, md } = useBreakpoint("md");
 *
 * if (isBelowMd) {
 *  // Do something
 * }
 * if (isAboveMd) {
 *  // Do something
 * }
 */
export function useBreakpoint<K extends TBreakpoint>(breakpointKey: K) {
  const breakpointValue = BREAKPOINTS[breakpointKey];

  const isBelow = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  });

  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: !isBelow,
    [`isBelow${capitalizedKey}`]: isBelow,
  } as Record<K, number> & Record<TKeyAbove<K> | TKeyBelow<K>, boolean>;
}
