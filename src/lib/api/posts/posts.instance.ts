import { apiURL, THttpServiceOptions } from "../../../modules";

import { TGetPostsResponsePayload } from "./posts.types";

import { KyClient } from "../apiClient";

import { withAuthHooks } from "../auth";

const postClient = new KyClient({
  hooks: withAuthHooks,
});

class PostApi {
  // endpoints
  #hostEndpoint = apiURL().toString();

  rootEndpoint = `${this.#hostEndpoint}posts` as const;

  // methods
  getPosts(options?: THttpServiceOptions) {
    return postClient.get<TGetPostsResponsePayload>(this.rootEndpoint, options);
  }
}

export const postApi = new PostApi();
