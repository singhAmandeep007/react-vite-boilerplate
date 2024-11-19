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

  const handleLogout = useCallback(() => {
    if (refreshToken) {
      // logout from the server
      authApi
        .logout({
          refreshToken,
        })
        .then(({ error }) => {
          // show errored show toast
          if (error) {
            toast({
              variant: "destructive",
              title: error?.message ?? "Logout failed",
            });
          }
        })
        .catch(() => {
          console.log("Logout error");
        });
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
  }, [toast, resetAuthStore, refreshToken, router, navigate]);

  return {
    handleLogout,
  };
};
