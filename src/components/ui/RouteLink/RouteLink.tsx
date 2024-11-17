import { Link, LinkProps } from "@tanstack/react-router";
import { FC } from "react";

export type TRouteLinkProps = {
  className?: string;
} & LinkProps;

export const RouteLink: FC<TRouteLinkProps> = ({ className, children, ...props }) => {
  return (
    <Link
      className={className}
      data-testid={`route-link-${props.to}`}
      {...props}
    >
      {({ isActive, isTransitioning }) =>
        typeof children === "function" ? children({ isActive, isTransitioning }) : children
      }
    </Link>
  );
};
