import { z } from "zod";

import { TUser, TUserToken } from "../user";

export const authLoginRequestSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Please enter a valid email address" })),
  password: z
    .string({ error: "Password is required" })
    .trim()
    .min(6, { error: "Password must be at least 6 characters" }),
});

export type TAuthLoginRequestPayload = z.infer<typeof authLoginRequestSchema>;

export type TAuthLoginResponsePayload = {
  user: TUser;
} & TUserToken;

export type TAuthRefreshAccessTokenRequestPayload = Pick<TUserToken, "refreshToken">;

export type TAuthRefreshAccessTokenResponsePayload = TUserToken;
