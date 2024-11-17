import { useCallback } from "react";

import { useNavigate, useRouter } from "@tanstack/react-router";
import { useToast } from "../../components/ui";
import { authApi } from "../../lib/api";
import { useStore } from "../../lib/store";

export const useAppLayout = () => {
  const { toast } = useToast();

  const router = useRouter();
  const navigate = useNavigate();

  const { resetAuthStore, refreshToken } = useStore();

  const handleLogout = useCallback(async () => {
    if (refreshToken) {
      // logout from the server
      const { error } = await authApi.logout({
        refreshToken,
      });

      // show errored show toast
      if (error) {
        toast({
          variant: "destructive",
          title: error?.message || "Logout failed",
        });
      }
    }

    // reset auth store
    resetAuthStore();

    // invalidate router and finally navigate to home page
    await router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
  }, [toast, resetAuthStore, refreshToken, router, navigate]);

  return {
    handleLogout,
  };
};
