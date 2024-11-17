import { ReactNode } from "react";

import { render as _render, type RenderOptions } from "@testing-library/react";

import { TWrapperProps, Wrapper } from "./Wrapper";

export type TRenderProps = RenderOptions & TWrapperProps;

export const render = (ui: ReactNode, options: TRenderProps = {}) => {
  const { config, wrapper, ...renderOptions } = options;

  const OuterWrapper = () => {
    const InnerWrapper = wrapper;

    return <Wrapper config={config}>{InnerWrapper ? <InnerWrapper>{ui}</InnerWrapper> : ui}</Wrapper>;
  };

  return _render(ui, { wrapper: OuterWrapper, ...renderOptions });
};
