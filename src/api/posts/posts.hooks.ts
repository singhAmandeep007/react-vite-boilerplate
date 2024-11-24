import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { TApiServiceError } from "../apiService";
import { postsService } from "./posts.service";
import { TGetPostsResponsePayload } from "./posts.types";

export const GET_POSTS_QUERY_KEY = postsService.rootEndpoint;

export const useGetPostsQuery = (
  options?: Omit<UseQueryOptions<TGetPostsResponsePayload, TApiServiceError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [GET_POSTS_QUERY_KEY],
    queryFn: async () => await postsService.getPosts(),
    ...options,
  });
};
