import { Hooks } from "ky";
import { useStore } from "../../store";
import { authService } from "./auth.service";

export const withAuthHooks: Hooks = {
  beforeRequest: [
    async function (request) {
      // add Authorization header and check for token expiration
      const { accessToken, refreshToken, expiresAt } = useStore.getState();

      // automatically refresh token if it's expired
      if (expiresAt && refreshToken && accessToken) {
        // check if accessToken is expired
        if (Date.now() >= expiresAt) {
          // refresh token using refreshToken api
          const { data, error } = await authService.refreshAccessToken(
            { refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (data) {
            // update auth store with new accessToken, refreshToken, and expiresAt
            useStore.setState((prev) => {
              return {
                ...prev,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresAt: data.expiresAt,
              };
            });

            // set Authorization header with accessToken
            request.headers.set("Authorization", `Bearer ${data.accessToken}`);
          }

          if (error) {
            // if refresh token fails, reset auth store
            useStore.getState().resetAuthStore();

            location.reload();
          }
        } else {
          // set Authorization header with accessToken
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
    },
  ],
};
