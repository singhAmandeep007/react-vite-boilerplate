import { http, HttpResponse } from "msw";

import { faker } from "@faker-js/faker/locale/en";

import { postApi } from "../../api/posts";

import { withAuth } from "./middleware";

export const getPosts = http.get(
  postApi.rootEndpoint,
  withAuth(({ request }) => {
    request.headers.get("Authorization");
    const generatePosts = () => {
      const posts = [];
      for (let i = 0; i < 10; i++) {
        posts.push({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          userId: faker.string.uuid(),
        });
      }
      return posts;
    };

    return HttpResponse.json(generatePosts());
  })
);
