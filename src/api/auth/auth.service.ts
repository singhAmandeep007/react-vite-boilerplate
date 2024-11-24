import { handleAsync } from "../../utils";

import {
  TAuthLoginRequestPayload,
  TAuthLoginResponsePayload,
  TAuthLogoutRequestPayload,
  TAuthRefreshAccessTokenRequestPayload,
  TAuthRefreshAccessTokenResponsePayload,
} from "./auth.types";

import { ApiService, TApiServiceError, TApiServiceOptions } from "../apiService";

const apiService = new ApiService();

class AuthService {
  rootEndpoint = `auth` as const;
  loginEndpoint = `${this.rootEndpoint}/login` as const;
  logoutEndpoint = `${this.rootEndpoint}/logout` as const;
  signupEndpoint = `${this.rootEndpoint}/signup` as const;
  forgotPasswordEndpoint = `${this.rootEndpoint}/forgotPassword` as const;
  refreshAccessTokenEndpoint = `${this.rootEndpoint}/refreshAccessToken` as const;

  // methods
  login(payload: TAuthLoginRequestPayload, options?: TApiServiceOptions) {
    return handleAsync<TApiServiceError, TAuthLoginResponsePayload>(() =>
      apiService.post(this.loginEndpoint, payload, options)
    );
  }

  logout(payload: TAuthLogoutRequestPayload, options?: TApiServiceOptions) {
    return apiService.post<void, TAuthLogoutRequestPayload>(this.logoutEndpoint, payload, options);
  }

  refreshAccessToken(payload: TAuthRefreshAccessTokenRequestPayload, options?: TApiServiceOptions) {
    return handleAsync<TApiServiceError, TAuthRefreshAccessTokenResponsePayload>(() =>
      apiService.post(this.refreshAccessTokenEndpoint, payload, options)
    );
  }
}

export const authService = new AuthService();
