import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import TodoCard from "../components/TodoCard";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { store } from "../state/store";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

type StoryProps = ComponentProps<typeof TodoCard>;


const meta: Meta<StoryProps> = {
  component: TodoCard,
  tags: ["autodocs"],
  argTypes: {
    showActions: {
      control: {
        type: "boolean",
      },
    },
  }
}

export default meta;

type Story = StoryObj<StoryProps>;

export const TodoCardWithOutActions: Story = {
  args: {
    showActions: false,
    todo: {
      id: "1",
      title: "Sample Todo",
      description: "Sample todo with actions",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["urgent", "personal"],
      done: false,
    },
    index: 0,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <DragDropContext onDragEnd={() => console.log("Drag Ended")}>
            <Droppable droppableId="droppable-2">
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  style={{ padding: "10px", backgroundColor: "#e3f2fd" }}
                >
                  <Story />
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </BrowserRouter>
      </Provider>
    ),
  ],
  render: (args) => (
    <Draggable draggableId={"1"} index={0}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TodoCard {...args} />
          <TodoCard {...args} />
        </div>
      )}
    </Draggable>
  ),
};


export const TodoCardWithActions: Story = {
  args: {
    showActions: true,
    todo: {
      id: "1",
      title: "Sample Todo",
      description: "Sample todo with actions",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["work", "personal"],
      done: false,
    },
  },
decorators: [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <DragDropContext onDragEnd={() => {}}> {/* Add DragDropContext */}
          <Story />
        </DragDropContext>
      </BrowserRouter>
    </Provider>
  ),
],
  render: (args) => <TodoCard {...args} />,
};