import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { TApiServiceError } from "../apiService";
import { authService } from "./auth.service";

export type TUseLogoutMutationOptions = UseMutationOptions<void, TApiServiceError>;

export const useLogoutMutation = (options?: TUseLogoutMutationOptions) => {
  return useMutation({
    mutationFn: () => authService.logout(),
    ...options,
  });
};
