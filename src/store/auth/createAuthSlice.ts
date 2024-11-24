import { assign } from "radash";
import { type StateCreator } from "zustand";

import { TUser, TUserToken } from "../../api/user";

export type TAuthStoreState = {
  user: TUser | null;
} & Partial<TUserToken>;

export type TAuthStoreActions = {
  updateAuthStore: (payload: RecursivePartial<TAuthStoreState>) => void;
  resetAuthStore: () => void;
};

const initialAuthStoreState: TAuthStoreState = {
  user: null,
  accessToken: undefined,
  refreshToken: undefined,
  expiresAt: undefined,
};

export type TAuthStore = TAuthStoreState & TAuthStoreActions;

export const createAuthStore: StateCreator<TAuthStore> = (set) => ({
  ...initialAuthStoreState,
  updateAuthStore: (payload) => set((state) => assign(state, payload)),
  resetAuthStore: () => set(() => initialAuthStoreState),
});
