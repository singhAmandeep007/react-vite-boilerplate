import { TGetPostsResponsePayload } from "./posts.types";

import { ApiService, TApiServiceOptions } from "../apiService";

import { withAuthHooks } from "../auth";

const apiService = new ApiService({
  hooks: withAuthHooks,
});

class PostsService {
  rootEndpoint = `posts` as const;

  // methods
  getPosts(options?: TApiServiceOptions) {
    return apiService.get<TGetPostsResponsePayload>(this.rootEndpoint, options);
  }
}

export const postsService = new PostsService();
