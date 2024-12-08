import { fn } from "@storybook/test";
import Task from "../components/Task";
import { ComponentProps } from "react";
import { Meta } from "@storybook/react";

type StoryProps = ComponentProps<typeof Task>

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
}

const meta: Meta<StoryProps> = {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  }
}


export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    }
  }
}

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    }
  }
}

export const Archived = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    }
  }
}



export default meta;