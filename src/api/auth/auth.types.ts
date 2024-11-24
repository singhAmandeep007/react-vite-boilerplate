import { z } from "zod";

import { TUser, TUserToken, userSchema } from "../user";

export const authLoginRequestSchema = userSchema.pick({ email: true }).extend({
  password: z.string().min(6),
});

export type TAuthLoginRequestPayload = z.infer<typeof authLoginRequestSchema>;

export type TAuthLoginResponsePayload = {
  user: TUser;
} & TUserToken;

export type TAuthRefreshAccessTokenRequestPayload = Pick<TUserToken, "refreshToken">;

export type TAuthRefreshAccessTokenResponsePayload = TUserToken;
