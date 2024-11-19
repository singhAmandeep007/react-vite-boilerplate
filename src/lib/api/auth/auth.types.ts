import { z } from "zod";

import { TUser, TUserToken, userSchema } from "../../types";

export const authLoginRequestSchema = userSchema.pick({ email: true }).extend({
  password: z.string().min(6),
});

export type TAuthLoginRequestPayload = z.infer<typeof authLoginRequestSchema>;

export type TAuthLoginResponsePayload = {
  user: TUser;
} & TUserToken;

export type TAuthLogoutRequestPayload = Pick<TUserToken, "refreshToken">;

export type TAuthRefreshAccessTokenRequestPayload = Pick<TUserToken, "refreshToken" | "accessToken">;
