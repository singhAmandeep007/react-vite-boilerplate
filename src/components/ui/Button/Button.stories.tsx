import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type TStory = StoryObj<typeof Button>;

export const Default: TStory = {
  args: {
    variant: "default",
    children: "Default Button",
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
  },
};
