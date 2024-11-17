import { z } from "zod";

import { THEME } from "../lib/config/theme";

import { LANGS_VALUES_MAP } from "../modules/i18n";

export const USER_ROLES = {
  admin: "admin",
  basic: "basic",
  pro: "pro",
} as const;

export const userRoleSchema = z.nativeEnum(USER_ROLES);

export const userAppSettingsSchema = z.object({
  theme: z.nativeEnum(THEME),
  lng: z.nativeEnum(LANGS_VALUES_MAP),
});

export const userSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  role: userRoleSchema,

  email: z.string().email(),
  name: z.string().min(1),

  appSettings: userAppSettingsSchema,

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userTokenSchema = z.object({
  refreshToken: z.string().min(1),
  accessToken: z.string().min(1),
  expiresAt: z.number(),
});

export type TUserToken = z.infer<typeof userTokenSchema>;

export type TUser = z.infer<typeof userSchema>;
