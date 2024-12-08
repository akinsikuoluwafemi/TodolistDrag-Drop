import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleTask } from "../components/Task";

const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export interface TaskBoxDataState {
  tasks: SingleTask[];
  status: string;
  error: string | null;
}

const TaskBoxData: TaskBoxDataState = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
}

const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{ id: string, newTaskState: string }>) => {
      const { id, newTaskState } = action.payload;
      const taskId = state.tasks.findIndex((task) => task.id === id);
      // if the task is found in the state, update it(findindex returns -1 if not found)
      if (taskId >= 0) {
        state.tasks[taskId].state = newTaskState
      }

    },
  },
});


export const { updateTaskState } = TasksSlice.actions;



const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  }
})
export const selectTasks = (state: RootState) => state.taskbox.tasks;
export const selectStatus = (state: RootState) => state.taskbox.status;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;