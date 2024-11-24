import { useCallback } from "react";

import { useRouter } from "@tanstack/react-router";
import { useLogoutMutation } from "../../api/auth";
import { useToast } from "../../components/ui";
import { useStore } from "../../store";

export const useAppLayout = () => {
  const { toast } = useToast();

  const router = useRouter();

  const { resetAuthStore } = useStore();

  const { mutateAsync } = useLogoutMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error?.message ?? "Logout failed",
      });
    },
  });

  const handleLogout = useCallback(async () => {
    await mutateAsync();

    // reset auth store
    resetAuthStore();

    // invalidate router and finally navigate to home page
    router.invalidate().catch(() => {
      console.log("Redirect Error");
    });
  }, [resetAuthStore, router, mutateAsync]);

  return {
    handleLogout,
  };
};
