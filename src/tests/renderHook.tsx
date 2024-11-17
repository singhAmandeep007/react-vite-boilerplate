import { ReactNode } from "react";

import { renderHook as _renderHook, RenderHookOptions } from "@testing-library/react";

import { TWrapperProps, Wrapper } from "./Wrapper";

export type TRenderHookProps<Props> = TWrapperProps & RenderHookOptions<Props>;

export const renderHook = <Props, Result>(
  render: (initialProps: Props) => Result,
  { config, ...options }: TRenderHookProps<Props> = {}
) => {
  const OuterWrapper = (props: { children: ReactNode }) => {
    const { children } = props;

    const InnerWrapper = options?.wrapper;

    return <Wrapper config={config}>{InnerWrapper ? <InnerWrapper {...props} /> : children}</Wrapper>;
  };

  return _renderHook(render, { ...options, wrapper: OuterWrapper });
};
