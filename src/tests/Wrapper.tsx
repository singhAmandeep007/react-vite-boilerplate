import { FC, PropsWithChildren, ReactNode } from "react";

import { Toaster } from "../components/ui/Toast";

import { ThemeProvider } from "../components/ui/ThemeToggler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProvider<T = any> = {
  Provider: FC<PropsWithChildren<T>>;
  props: Record<string, unknown>;
};

const addProviders = (providers: TProvider[] = [], component: ReactNode) => {
  if (!providers.length) {
    return component;
  }

  const [first, ...rest] = providers;

  const { Provider, props } = first;

  return <Provider {...props}>{addProviders(rest, component)}</Provider>;
};

export type TWrapperProps = {
  config?: {
    withToaster?: boolean;
  };
};

export const Wrapper: FC<PropsWithChildren<TWrapperProps>> = ({
  children,
  config = {
    withToaster: true,
  },
}) => {
  const providers: TProvider[] = [];

  providers.push({ Provider: ThemeProvider, props: {} });

  return (
    <>
      {addProviders(providers, children)}
      {config?.withToaster && <Toaster />}
    </>
  );
};
