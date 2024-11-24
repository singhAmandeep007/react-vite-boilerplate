import { StateCreator, StoreMutatorIdentifier } from "zustand";

type TLoggerImplOptions = {
  name?: string;
  enabled?: boolean;
};

type TLogger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  options?: TLoggerImplOptions
) => StateCreator<T, Mps, Mcs>;

type TLoggerImpl = <T>(f: StateCreator<T, [], []>, options?: TLoggerImplOptions) => StateCreator<T, [], []>;

const loggerImpl: TLoggerImpl =
  (config, options = {}) =>
  (set, get, store) => {
    const loggedSet: typeof set = (...args) => {
      set(...(args as Parameters<typeof set>));
      if (options.enabled) {
        console.log(
          "%c[Zustand] Store",
          "color: #f79009;font-weight: bold;",
          ...(options?.name ? [`${options?.name}:`] : []),
          get()
        );
      }
    };
    const setState = store.setState;

    store.setState = (...args) => {
      setState(...(args as Parameters<typeof setState>));
      if (options.enabled) {
        console.log(...(options.name ? [`${options.name}:`] : []), store.getState());
      }
    };

    return config(loggedSet, get, store);
  };

export const logger = loggerImpl as TLogger;
