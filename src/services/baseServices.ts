import { LocalStorageService } from './LocalStorageServices';
import { ITodo } from "../types";
import { mockTodos } from "../utils";
import { toast } from 'react-toastify';


export const BaseServices = {
  async getTodos(): Promise<ITodo[]> {
    // Simulate a 500-ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    let todos = (await LocalStorageService.get("todos")) as ITodo[];
    // If todos don't exist in local storage, set them to mockTodos
    if (!todos) {
      await LocalStorageService.set("todos", mockTodos); // Set the mockTodos to local storage
      todos = mockTodos;
    }
    return todos;
  },
  async getTodo(id: string) {
    const todos = await this.getTodos();
    const todo = todos.find((todo: ITodo) => todo.id == id);
    if (!todo) throw new Response("", {
      status: 404,
      statusText: "Todo not found"
    })
    return todo;
  },
   async createTodo(todo: ITodo) {
     // Simulate a delay of 2 seconds
     const todos = await this.getTodos();
     todos.unshift(todo);
     toast.success("Todo created successfully");
     await LocalStorageService.set("todos", todos);
     return todo;
   },
  async updateTodo(todo: ITodo) {
    const todos = await this.getTodos();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index < 0) throw new Response("", {
      status: 404,
      statusText: "Todo not found"
    })
    todos[index] = todo;
     toast.success("Todo updated successfully");
    await LocalStorageService.set("todos", todos);
    return todo;
  },
  async deleteTodo(id: string) {
    const todos = await this.getTodos();
    const index = todos.findIndex((t) => t.id === id);
    if (index < 0) throw new Response("", {
      status: 404,
      statusText: "Todo not found"
    })
    todos.splice(index, 1);
     toast.success("Todo deleted successfully");
    await LocalStorageService.set("todos", todos);
    this.getAllTags(); // Update the tags in local storage
    return id;
  },
  async getAllTags() {
    const todos = await this.getTodos();
    const tags = todos.map((todo) => todo.tags).flat();
    const uniqueTags = [...new Set(tags)] as string[];
    LocalStorageService.set("tags", uniqueTags); // Set the tags to local storage everytime
    return uniqueTags;
  }
}


