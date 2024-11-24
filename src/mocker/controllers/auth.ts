import { HttpResponse, http } from "msw";

import { faker } from "@faker-js/faker/locale/en";

import {
  TAuthLoginRequestPayload,
  TAuthLoginResponsePayload,
  TAuthRefreshAccessTokenRequestPayload,
  TAuthRefreshAccessTokenResponsePayload,
  authService,
} from "../../api/auth";

import { apiURL } from "../../utils";

export type THTTPError = {
  message: string;
};

export const login = http.post<never, TAuthLoginRequestPayload, TAuthLoginResponsePayload | THTTPError>(
  apiURL(authService.loginEndpoint).toString(),
  async ({ request }) => {
    // return HttpResponse.json({ message: "Check email and password" }, { status: 401 });
    const { email } = await request.json();

    const response: TAuthLoginResponsePayload = {
      user: {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        role: "basic",
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        email,
        name: faker.person.fullName(),
        appSettings: {
          theme: "light",
          lng: "en-US",
        },
      },
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
      expiresAt: faker.date.future().getTime(),
    };

    return HttpResponse.json(response);
  }
);

export const logout = http.post(apiURL(authService.logoutEndpoint).toString(), () => {
  return HttpResponse.json({}, { status: 200 });
});

export const refreshAccessToken = http.post<
  never,
  TAuthRefreshAccessTokenRequestPayload,
  TAuthRefreshAccessTokenResponsePayload | THTTPError
>(apiURL(authService.refreshAccessTokenEndpoint).toString(), async ({ request }) => {
  const { refreshToken } = await request.json();

  if (!refreshToken) {
    return HttpResponse.json({ message: "Refresh token is required" }, { status: 400 });
  }

  return HttpResponse.json({
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    expiresAt: faker.date.future().getTime(),
  });
});
