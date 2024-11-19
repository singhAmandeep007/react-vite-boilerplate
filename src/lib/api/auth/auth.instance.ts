import { apiURL, handleAsync, THttpServiceOptions } from "../../../modules";

import { TUserToken } from "../../types";
import {
  TAuthLoginRequestPayload,
  TAuthLoginResponsePayload,
  TAuthLogoutRequestPayload,
  TAuthRefreshAccessTokenRequestPayload,
} from "./auth.types";

import { apiClient, THTTPError } from "../apiClient";

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
  login(payload: TAuthLoginRequestPayload, options?: THttpServiceOptions) {
    return handleAsync<THTTPError, TAuthLoginResponsePayload>(() =>
      apiClient.post(this.loginEndpoint, payload, options)
    );
  }

  logout(payload: TAuthLogoutRequestPayload, options?: THttpServiceOptions) {
    return apiClient.post<void, TAuthLogoutRequestPayload>(this.logoutEndpoint, payload, options);
  }

  refreshAccessToken(payload: TAuthRefreshAccessTokenRequestPayload, options?: THttpServiceOptions) {
    return handleAsync<THTTPError, TUserToken>(() => apiClient.post(this.refreshAccessTokenEndpoint, payload, options));
  }
}

export const authApi = new AuthApi();
