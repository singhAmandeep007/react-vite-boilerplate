import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useCallback } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { useNavigate, useRouter } from "@tanstack/react-router";
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
  const navigate = useNavigate();

  const updateAuthStore = useStore.use.updateAuthStore();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      void form.handleSubmit(
        async (payload) => {
          const { data, error } = await authService.login(payload);

          if (data) {
            // update auth store with new accessToken, refreshToken, and expiresAt
            updateAuthStore(data);
            // invalidate router
            await router
              .invalidate()
              .finally(() => {
                // navigate to the app
                void navigate({ to: "/app" });
              })
              .catch(console.error);
          }

          if (error) {
            const errorResponse = error.response ? await error.response.json() : undefined;
            toast({
              variant: "destructive",
              title: errorResponse?.message ?? error?.message,
            });
          }
        },
        () => {
          // Invalid form values are already reflected in formState errors.
        }
      )(e);
    },
    [form, toast, updateAuthStore, router, navigate]
  );

  return {
    form,
    handleSubmit,
  };
};
