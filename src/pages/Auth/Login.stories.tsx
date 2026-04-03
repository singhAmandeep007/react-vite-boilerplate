import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { authService } from "../../api/auth";
import * as handlers from "../../mocker/controllers";
import { withRouterAndToaster } from "../../tests/storybook";
import { apiURL } from "../../utils";
import { Login } from "./Login";

const meta: Meta<typeof Login> = {
  title: "Pages/Auth/Login",
  component: Login,
  decorators: [withRouterAndToaster],
  parameters: {
    msw: {
      handlers: Object.values(handlers),
    },
  },
};

export default meta;

type TStory = StoryObj<typeof Login>;

export const Default: TStory = {};

export const ErrorState: TStory = {
  parameters: {
    msw: {
      handlers: [
        http.post(apiURL(authService.loginEndpoint).toString(), () => {
          return HttpResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }),
      ],
    },
  },
};
