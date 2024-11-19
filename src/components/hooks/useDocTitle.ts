import { useLocation } from "@tanstack/react-router";
import React, { useEffect } from "react";

type TUseDocTitleProps = {
  deps: React.DependencyList;
  options: TTitleConfig;
};

type TTitleConfig = {
  defaultTitle?: string;
  titleMap?: Record<string, string>;
  capitalize?: boolean;
};

function getAppTitle(location: { pathname: string }, config: TTitleConfig = {}) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    defaultTitle = window?.Cypress ? window?.Cypress?.env("VITE_APP_NAME") : import.meta.env.VITE_APP_NAME,
    titleMap = {},
    capitalize = true,
  } = config;

  // remove leading and trailing slashes and split into segments
  const segments = location.pathname.split("/").filter(Boolean);

  // get the last segment of the path
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment) return defaultTitle as string;

  // check if we have a custom mapping for this path
  const fullPath = segments.join("/");
  if (titleMap[fullPath]) return titleMap[fullPath];
  if (titleMap[lastSegment]) return titleMap[lastSegment];

  // format the segment
  let title = lastSegment.replace(/[-_]/g, " ");

  if (capitalize) {
    title = title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return title;
}

export function useDocTitle(props: TUseDocTitleProps = { deps: [], options: {} }) {
  const location = useLocation();

  const { deps, options } = props;

  // once the page component renders, update HTML document's title
  useEffect(() => {
    const previousTitle = document.title;

    document.title = getAppTitle(location, options);

    return function () {
      document.title = previousTitle;
    };
  }, [...deps /* eslint-disable-line react-hooks/exhaustive-deps */, location]);
}
