import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useCallback } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { useRouter } from "@tanstack/react-router";
import { TAuthLoginRequestPayload, authLoginRequestSchema, authService } from "../../api/auth";
import { useToast } from "../../components/ui";
import { useStore } from "../../store/store";

export type TUseLoginFormProps = {
  defaultValues?: DefaultValues<TAuthLoginRequestPayload>;
};

export const useLoginForm = ({ defaultValues }: TUseLoginFormProps = {}) => {
  const form = useForm<TAuthLoginRequestPayload>({
    resolver: zodResolver(authLoginRequestSchema),
    defaultValues,
  });

  const { toast } = useToast();

  const router = useRouter();

  const updateAuthStore = useStore.use.updateAuthStore();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      form
        .handleSubmit(async (payload) => {
          const { data, error } = await authService.login(payload);

          if (data) {
            // update auth store with new accessToken, refreshToken, and expiresAt
            updateAuthStore(data);
            // invalidate router
            await router.invalidate();
          }

          if (error) {
            const errorResponse = await error.response.json();
            toast({
              variant: "destructive",
              title: errorResponse?.message ?? error?.message,
            });
          }
        })(e)
        .catch(console.error);
    },
    [form, toast, updateAuthStore, router]
  );

  return {
    form,
    handleSubmit,
  };
};
