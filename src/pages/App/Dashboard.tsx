import { FC, PropsWithChildren } from "react";
import { useGetPostsQuery } from "../../lib/api/posts";

export type TDashboardProps = Record<string, never>;

export const Dashboard: FC<PropsWithChildren<TDashboardProps>> = () => {
  const { data, isSuccess, isError, error } = useGetPostsQuery({
    retry: false,
  });

  return (
    <div className="p-4">
      {isSuccess && (
        <ul className="space-y-4">
          {data.map((post) => (
            <li
              key={post.id}
              className="rounded-lg bg-foreground p-4 shadow"
            >
              <h2 className="text-md font-semibold text-primary">{post.title}</h2>
              <p className="text-gray-500">User ID: {post.userId}</p>
            </li>
          ))}
        </ul>
      )}
      {isError && <div className="text-destructive">Error: {error.message}</div>}
      {!isSuccess && !isError && (
        <ul className="space-y-4">
          {[1, 2, 3, 4, 5].map((placeholder) => (
            <li
              key={placeholder}
              className="animate-pulse rounded-lg bg-white p-4 shadow"
            >
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
