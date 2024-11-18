import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Login } from "./Login";

import { describe, expect, it } from "vitest";
import { authApi } from "../../lib";
import { createTestMswServer, http, HttpResponse, render } from "../../tests";

const testServer = createTestMswServer();

describe("Login", () => {
  const setup = async () => {
    const view = render(<Login />);

    await waitFor(() => expect(screen.queryByRole("button", { name: "Login" })).toBeVisible());

    return {
      view,
    };
  };

  it("renders the login form", async () => {
    await setup();

    expect(screen.getByPlaceholderText("m@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("successfully submits the form with email and password", async () => {
    await setup();

    await userEvent.type(screen.getByPlaceholderText("m@example.com"), "test@example.com");

    await userEvent.type(screen.getByPlaceholderText("********"), "password");

    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => expect(location.pathname).toBe("/app"));
  });

  it("shows an error message if the fails", async () => {
    await setup();

    testServer.use(
      http.post(authApi.loginEndpoint, () => {
        return HttpResponse.json({ message: "Error login failed" }, { status: 500 });
      })
    );

    await userEvent.type(screen.getByPlaceholderText("m@example.com"), "test@example.com");

    await userEvent.type(screen.getByPlaceholderText("********"), "password");

    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Error login failed")).toBeInTheDocument();
    });

    await waitFor(() => expect(location.pathname).toBe("/"));
  });
});
