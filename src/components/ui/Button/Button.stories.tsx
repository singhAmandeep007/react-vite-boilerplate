import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["test"],
};

export default meta;

type TStory = StoryObj<typeof Button>;

export const Default: TStory = {
  args: {
    variant: "default",
    children: "Default Button",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Default Button" });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Destructive: TStory = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Outline: TStory = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Secondary: TStory = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: TStory = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: TStory = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Disabled: TStory = {
  args: {
    disabled: true,
    children: "Disabled Button",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Disabled Button" });

    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
