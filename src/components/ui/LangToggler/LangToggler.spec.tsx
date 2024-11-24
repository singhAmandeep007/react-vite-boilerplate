import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it } from "vitest";

import { render } from "../../../tests/render";

import { LangToggler } from "./LangToggler";

describe("LangToggler", () => {
  const setup = () => {
    return {
      result: render(<LangToggler />, {
        config: {
          withRouter: false,
          withToaster: false,
        },
      }),
    };
  };

  it("opens the dropdown menu when clicked and shows language options", async () => {
    setup();

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      return expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    expect(screen.getByText("English")).toBeInTheDocument();

    expect(screen.getByText("Japanese")).toBeInTheDocument();
  });

  it("changes language when a language option is clicked", async () => {
    setup();

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Japanese"));

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByText("Japanese")).toHaveClass("text-primary");
    });
  });

  it("closes the dropdown when clicking outside", async () => {
    setup();

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    // READ-MORE: https://github.com/testing-library/user-event/issues/662
    await userEvent.click(document.body, { pointerEventsCheck: 0 });

    await waitFor(() => {
      expect(screen.queryByTestId("lang-toggler-menu")).not.toBeInTheDocument();
    });
  });
});
