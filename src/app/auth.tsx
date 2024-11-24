import { createContext, useContext } from "react";

import { TAuthStoreState, useStore } from "../store";

export type TAuthContext = TAuthStoreState | null;

const AuthContext = createContext<TAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useStore.use.user();

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
