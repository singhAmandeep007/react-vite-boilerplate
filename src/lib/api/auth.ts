import { z } from "zod";

import { Hooks } from "ky";

import { apiURL, handleAsync, i18n, THttpServiceOptions } from "../../modules";

import { TUserToken, userSchema, type TUser } from "../types";

import { useStore } from "../store";
import { httpService, THTTPError } from "./httpService";

export type TAuthLoginRequestPayload = z.infer<typeof authLoginRequestSchema>;

export type TAuthLoginResponsePayload = {
  user: TUser;
} & TUserToken;

export type TAuthLogoutRequestPayload = Pick<TUserToken, "refreshToken">;

type TAuthRefreshAccessTokenRequestPayload = Pick<TUserToken, "refreshToken" | "accessToken">;

// schema validations
export const authLoginRequestSchema = userSchema.pick({ email: true }).extend({
  password: z.string().min(6),
});

// api class
class AuthApi {
  // endpoints
  #hostEndpoint = apiURL().toString();

  // NOTE: don't use forward slash for rootEndpoint
  rootEndpoint = `${this.#hostEndpoint}auth` as const;

  loginEndpoint = `${this.rootEndpoint}/login` as const;

  logoutEndpoint = `${this.rootEndpoint}/logout` as const;

  signupEndpoint = `${this.rootEndpoint}/signup` as const;

  forgotPasswordEndpoint = `${this.rootEndpoint}/forgotPassword` as const;

  refreshAccessTokenEndpoint = `${this.rootEndpoint}/refreshAccessToken` as const;

  // methods
  async login(payload: TAuthLoginRequestPayload, options?: THttpServiceOptions) {
    return await handleAsync<THTTPError, TAuthLoginResponsePayload>(() =>
      httpService.post(this.loginEndpoint, payload, options)
    );
  }

  async logout(payload: TAuthLogoutRequestPayload, options?: THttpServiceOptions) {
    return await handleAsync<THTTPError, void>(() => httpService.post(this.logoutEndpoint, payload, options));
  }

  async refreshAccessToken(payload: TAuthRefreshAccessTokenRequestPayload, options?: THttpServiceOptions) {
    return await handleAsync<THTTPError, TUserToken>(() =>
      httpService.post(this.refreshAccessTokenEndpoint, payload, options)
    );
  }
}

// instance
export const authApi = new AuthApi();

export const withAuthHooks: Hooks = {
  beforeRequest: [
    async function (request) {
      request.headers.set("Accept-Language", i18n.currentLanguage);

      // if request is an API request, add Authorization header
      const isAPIRequest = request.url.startsWith(import.meta.env.VITE_API_URL);

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
