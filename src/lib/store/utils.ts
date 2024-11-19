import { parse, stringify } from "superjson"; // can use anything: serialize-javascript, devalue, etc.
import { StoreApi, UseBoundStore } from "zustand";
import { PersistStorage } from "zustand/middleware";

type TWithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as TWithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const createCustomStorage = <T>(): PersistStorage<T> => ({
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
});
