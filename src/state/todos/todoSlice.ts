import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodo } from "../../types";
import { LocalStorageService } from "../../services/LocalStorageServices";



export interface TodoState {
  allTodos: ITodo[];
  filteredTodos: ITodo[];
  todoTags: string[]  | any;
  selectedTag: string;
}

const tagsPromise = LocalStorageService.get("tags").then(t => t).then(t => t || []);


  // console.log(tagsPromise, "tagsPromise");


const initialState: TodoState = {


  allTodos: [],
  filteredTodos: [],
  todoTags: tagsPromise,
  selectedTag: "",
};

// "music": [
//   {},{},{}
// ]

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.allTodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.allTodos[index] = {
          ...state.allTodos[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
      state.filteredTodos = state.allTodos;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.id !== action.payload
      );
      state.filteredTodos = state.allTodos;
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.allTodos.unshift(action.payload);
      state.filteredTodos = state.allTodos;
    },
    reorderTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.allTodos = action.payload;
      state.filteredTodos = state.allTodos;
    },
    searchTodos: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload.toLowerCase();
      if (searchValue === "") {
        state.filteredTodos = state.allTodos;
      } else {
        state.filteredTodos = state.allTodos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchValue) ||
            todo.description.toLowerCase().includes(searchValue)
        );
      }
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.allTodos = action.payload;
      state.filteredTodos = action.payload;
    },
    setAllTodoTags: (state, action: PayloadAction<string[]>) => {
      state.todoTags = action.payload;
    },
    filterByTag: (state, action: PayloadAction<string>) => { 
      state.selectedTag = action.payload;
      if (action.payload === "") {
        state.filteredTodos = state.allTodos;
      } else {
        state.filteredTodos = state.allTodos.filter((todo) =>
          todo.tags?.includes(action.payload)
        );

      }
    }
  },
});

export const {
  updateTodo,
  deleteTodo,
  addTodo,
  reorderTodos,
  searchTodos,
  setTodos,
  setAllTodoTags,
  filterByTag
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.filteredTodos;

export const allTags = (state: RootState) => state.todos.todoTags;

export default todoSlice.reducer;