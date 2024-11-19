import { Hooks } from "ky";
import { i18n } from "../../../modules";
import { useStore } from "../../store";
import { authApi } from "./auth.instance";

export const withAuthHooks: Hooks = {
  beforeRequest: [
    async function (request) {
      request.headers.set("Accept-Language", i18n.currentLanguage);

      // if request is an API request, add Authorization header
      const isAPIRequest = request.url.startsWith(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        window?.Cypress ? window.Cypress?.env("VITE_API_URL") : import.meta.env.VITE_API_URL
      );

      // if request is an API request, add Authorization header and check for token expiration
      if (isAPIRequest) {
        const { accessToken, refreshToken, expiresAt } = useStore.getState();

        // automatically refresh token if it's expired
        if (expiresAt && refreshToken && accessToken) {
          // check if accessToken is expired
          if (Date.now() >= expiresAt) {
            // refresh token using refreshToken api
            const { data, error } = await authApi.refreshAccessToken({ refreshToken, accessToken });

            if (data) {
              // update auth store with new accessToken, refreshToken, and expiresAt
              useStore.use.updateAuthStore()(data);

              request.headers.set("Authorization", `Bearer ${data.accessToken}`);
            }

            if (error) {
              // if refresh token fails, reset auth store
              useStore.use.resetAuthStore();
            }
          } else {
            // set Authorization header with accessToken
            request.headers.set("Authorization", `Bearer ${accessToken}`);
          }
        }
      }
    },
  ],
};
