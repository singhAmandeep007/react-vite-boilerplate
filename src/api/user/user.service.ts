import { TUpdateUserRequestPayload, TUpdateUserResponsePayload } from "./user.types";

import { ApiService, TApiServiceOptions } from "../apiService";

import { withAuthHooks } from "../auth/auth.ky.hooks";

const apiService = new ApiService();

apiService.extend({
  hooks: {
    ...withAuthHooks,
  },
});

class UserService {
  rootEndpoint = `user` as const;

  // methods
  updateUser(payload: TUpdateUserRequestPayload, options?: TApiServiceOptions) {
    return apiService.patch<TUpdateUserResponsePayload>(this.rootEndpoint, payload, options);
  }
}

export const userService = new UserService();
