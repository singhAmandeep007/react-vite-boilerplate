import { useCallback } from "react";

import { useNavigate, useRouter } from "@tanstack/react-router";
import { useToast } from "../../components/ui";
import { useLogoutMutation } from "../../lib/api/auth";
import { useStore } from "../../lib/store";

export const useAppLayout = () => {
  const { toast } = useToast();

  const router = useRouter();
  const navigate = useNavigate();

  const { resetAuthStore, refreshToken } = useStore();

  const { mutateAsync } = useLogoutMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error?.message ?? "Logout failed",
      });
    },
  });

  const handleLogout = useCallback(async () => {
    console.log(refreshToken);
    if (refreshToken) {
      await mutateAsync({ refreshToken });
    }

    // reset auth store
    resetAuthStore();

    // invalidate router and finally navigate to home page
    router
      .invalidate()
      .finally(() => {
        void navigate({ to: "/" });
      })
      .catch(() => {
        console.log("Redirect Error");
      });
  }, [resetAuthStore, refreshToken, router, navigate, mutateAsync]);

  return {
    handleLogout,
  };
};
