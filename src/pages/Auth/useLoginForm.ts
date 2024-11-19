import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useCallback } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { useNavigate, useRouter } from "@tanstack/react-router";
import { useToast } from "../../components/ui";
import { TAuthLoginRequestPayload, authApi, authLoginRequestSchema } from "../../lib/api/auth";
import { useStore } from "../../lib/store";

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
  const navigate = useNavigate();

  const updateAuthStore = useStore.use.updateAuthStore();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      form
        .handleSubmit(async (payload) => {
          const { data, error } = await authApi.login(payload);

          if (data) {
            // update auth store with new accessToken, refreshToken, and expiresAt
            updateAuthStore(data);
            // invalidate router
            await router.invalidate();
            // navigate to app page
            await navigate({ to: "/app" });
          }

          if (error) {
            toast({
              variant: "destructive",
              title: error?.message || "Login failed",
            });
          }
        })(e)
        .catch(console.error);
    },
    [form, toast, updateAuthStore, router, navigate]
  );

  return {
    form,
    handleSubmit,
  };
};
