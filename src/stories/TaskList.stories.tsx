import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import TaskList from "../components/TaskList";
import * as TaskStories from "./Task.stories";
import  { SingleTask } from "../components/Task";
import { TaskBoxDataState } from "../lib/store";


type StoryProps = ComponentProps<typeof TaskList>;

type Story = StoryObj<StoryProps>;


const meta: Meta<StoryProps> = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
 
};

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
}

// A super-simple mock of the store
interface MockStoreProps {
  taskboxState: TaskBoxDataState;
  children: React.ReactNode;
}

const Mockstore = ({ taskboxState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (
              state,
              action: PayloadAction<{ id: string; newTaskState: string }>
            ) => {
              const { id, newTaskState } = action.payload;
              const taskId = state.tasks.findIndex((task: SingleTask) => task.id === id);
              if (taskId >= 0) {
                state.tasks[taskId].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const Default: Story = {
 
  decorators: [
    (Story) => (
      <Mockstore taskboxState={MockedState}>
        <Story />
      </Mockstore>
    ),
  ]
}

export const WithPinnedTasks: Story = {
  decorators: [
    (Story) => {
      const pinnedTasks =
        [...MockedState.tasks.slice(0, 5),
        {id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED'}
        ]
      return (
        <Mockstore
          taskboxState={{ ...MockedState, tasks: pinnedTasks }}
        >
          <Story />
        </Mockstore>
      )
    }
  ]
}

export const Loading: Story = {

  decorators: [
    (Story) => (
      <Mockstore taskboxState={{...MockedState, status: 'loading'}}>
        <Story />
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <Mockstore taskboxState={{...MockedState, tasks: []}}>
        <Story />
      </Mockstore>
    )
  ]
}


export default meta;