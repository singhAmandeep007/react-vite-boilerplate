import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../modules/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      // blockquote: "mt-6 border-l-2 pl-6 italic",
      // ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      // inlineCode:
      //     "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      withoutPMargin: "[&:not(:first-child)]:mt-0",
    },
  },
  defaultVariants: {
    variant: "h1",
    affects: "default",
  },
});

export type TTypographyProps = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof typographyVariants>;

const Typography = React.forwardRef<HTMLHeadingElement, TTypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    const Comp = variant ?? "h1";
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

// eslint-disable-next-line react-refresh/only-export-components
export { Typography, typographyVariants };
