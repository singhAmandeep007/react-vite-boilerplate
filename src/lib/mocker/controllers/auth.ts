import { HttpResponse, http } from "msw";

import { faker } from "@faker-js/faker";

import { TAuthLoginRequestPayload, TAuthLoginResponsePayload, authApi } from "../../api";

// NOTE: keep it's evaluation separate.
// const endpoints = {
//   login: authApi.loginEndpoint,
// };

export const login = http.post<never, TAuthLoginRequestPayload, TAuthLoginResponsePayload>(
  authApi.loginEndpoint,
  async ({ request }) => {
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

export const logout = http.post(authApi.logoutEndpoint, () => {
  return HttpResponse.json({}, { status: 200 });
});

export const refreshToken = http.post(authApi.refreshAccessTokenEndpoint, () => {
  return HttpResponse.json(faker.string.uuid());
});
