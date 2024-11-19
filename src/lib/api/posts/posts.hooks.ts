import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { THTTPError } from "../apiClient";
import { postApi } from "./posts.instance";
import { TGetPostsResponsePayload } from "./posts.types";

export const GET_POSTS_QUERY_KEY = "/posts";

export const useGetPostsQuery = (
  options?: Omit<UseQueryOptions<TGetPostsResponsePayload, THTTPError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [GET_POSTS_QUERY_KEY],
    queryFn: async () => await postApi.getPosts(),
    ...options,
  });
};
