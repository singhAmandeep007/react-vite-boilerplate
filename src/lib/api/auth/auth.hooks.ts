import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { THTTPError } from "../apiClient";
import { authApi } from "./auth.instance";
import { TAuthLogoutRequestPayload } from "./auth.types";

export type TUseLogoutMutationOptions = UseMutationOptions<void, THTTPError, TAuthLogoutRequestPayload>;
export const useLogoutMutation = (options?: TUseLogoutMutationOptions) => {
  return useMutation({
    mutationFn: (args) => authApi.logout(args),
    ...options,
  });
};
