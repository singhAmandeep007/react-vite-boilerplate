import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { TApiServiceError } from "../apiService";
import { authService } from "./auth.service";
import { TAuthLogoutRequestPayload } from "./auth.types";

export type TUseLogoutMutationOptions = UseMutationOptions<void, TApiServiceError, TAuthLogoutRequestPayload>;

export const useLogoutMutation = (options?: TUseLogoutMutationOptions) => {
  return useMutation({
    mutationFn: (args) => authService.logout(args),
    ...options,
  });
};
