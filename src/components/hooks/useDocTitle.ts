import { useLocation } from "@tanstack/react-router";
import React, { useEffect } from "react";

import { getEnvValue } from "../../utils";

type TTitleConfig = {
  defaultTitle?: string;
  titleMap?: Record<string, string>;
  capitalize?: boolean;
};

function getAppTitle(location: { pathname: string }, config: TTitleConfig = {}) {
  const { defaultTitle = getEnvValue("VITE_APP_NAME"), titleMap = {}, capitalize = true } = config;

  // remove leading and trailing slashes and split into segments
  const segments = location.pathname.split("/").filter(Boolean);

  // get the last segment of the path
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment) return defaultTitle;

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

type TUseDocTitleProps = {
  deps: React.DependencyList;
  options: TTitleConfig;
};

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
