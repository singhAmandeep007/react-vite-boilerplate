import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Login } from "./Login";

import { describe, expect, it } from "vitest";
import { authApi } from "../../lib";
import { createTestMswServer, http, HttpResponse, render } from "../../tests";

const testServer = createTestMswServer();

describe("Login", () => {
  const setup = async () => {
    const result = render(<Login />);

    await waitFor(() => expect(screen.queryByRole("button", { name: "Login" })).toBeVisible());

    return {
      result,
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

    fireEvent.change(screen.getByPlaceholderText("m@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "Login" })).toBeDisabled());

    await waitFor(() => expect(location.pathname).toBe("/app"));
  });

  it("shows an error message if the fails", async () => {
    await setup();

    testServer.use(
      http.post(authApi.loginEndpoint, () => {
        return HttpResponse.json({ message: "Error login failed" }, { status: 500 });
      })
    );

    fireEvent.change(screen.getByPlaceholderText("m@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Error login failed")).toBeInTheDocument();
    });

    await waitFor(() => expect(location.pathname).toBe("/"));
  });
});
