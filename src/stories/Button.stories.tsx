import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ComponentProps } from "react";
import { Button } from "../components/Button";

// the & operator is used to combine two types
type StoryProps = ComponentProps<typeof Button> & {
  buttonText: string;
}

const meta: Meta<StoryProps> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
};


export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    buttonText: "Click Me",
    variant: 'primary',
    size: 'md'
  },
  render: ({ buttonText, ...args }) => <Button {...args} >{buttonText}</Button> //passing children

  // render: (args) => <Button {...args}>Primary</Button> //passing children
};

export const Secondary: Story = {
  args: {
    buttonText: "Click Me",
    variant: "secondary",
    size: "md",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>, //passing children

  // render: (args) => <Button {...args}>Primary</Button> //passing children
};