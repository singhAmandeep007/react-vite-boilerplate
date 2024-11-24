// import { createWithEqualityFn } from "zustand/traditional"; // causing problem with testing
import { StateStorage, createJSONStorage, devtools, persist, subscribeWithSelector } from "zustand/middleware";

import { logger } from "./middlewares";
import { createSelectors } from "./utils";

import { StateCreator, create } from "zustand";

import { isDevelopment } from "../utils";
import { createAuthStore, type TAuthStore } from "./auth";

export type TStore = TAuthStore;

// NOTE: must keep unique keys for each store slice
export const store: StateCreator<TStore> = (...args) => ({
  ...createAuthStore(...args),
});

const isDebugMode = isDevelopment && Boolean(import.meta.env.VITE_VITEST_ENV) === false;

export const STORE_VERSION = 1;
export const STORE_NAME = "tasksManagerStore";
export const useStoreBase = create<TStore>()(
  logger(
    devtools(
      // to subscribe with a selector, now useStore.subscribe accepts addtional signature
      // subscribe(selector, callback, options?: { equalityFn, fireImmediately }): Unsubscribe
      subscribeWithSelector(
        // READ-MORE: https://docs.pmnd.rs/zustand/integrations/persisting-store-data
        persist(store, {
          // required, (unique)
          name: STORE_NAME,
          // (optional) by default the 'localStorage' is used. Custom storage function(implementing StateStorage type) can also be used.
          storage: createJSONStorage(() => sessionStorage as StateStorage),
          // old persisted version of the store will be dumped and new persisted store will be used if version doesn't match.
          // NOTE: use migrate function to handle breaking changes in order to persist previously stored data.
          version: STORE_VERSION,
          // enables us to pick specific state's fields to be stored in the storage
          partialize: (state) => state,
          migrate: (persistedState, prevVersion) => {
            if (prevVersion !== STORE_VERSION) {
              // handle breaking changes here
              // persistedState.newField = persistedState.oldField
              // delete persistedState.oldField

              return persistedState;
            }
          },
        })
      ),
      { enabled: isDebugMode }
    ),
    {
      name: STORE_NAME,
      enabled: isDebugMode,
    }
  )
);

export const clearStore = () => useStoreBase.persist.clearStorage();

export const useStore = createSelectors(useStoreBase);
