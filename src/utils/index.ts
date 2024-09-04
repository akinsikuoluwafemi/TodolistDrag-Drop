import moment from "moment";
import { ITodo } from "../types";

export const mockTodos: ITodo[] = [
  {
    id: Math.random().toString(36).substring(2, 9),
    title: "Make Dinner",
    description: "Make dinner for the family",
    done: false,
    deadline: "2024-07-01T00:00:00Z",
    tags: ["cooking", "family", "dinner", "mornings"],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
  {
    id: Math.random().toString(36).substring(2, 9),
    title: "Make Lunch",
    description: "Make lunch for the family",
    done: false,
    tags: ["cooking", "family", "lunch", "quick"],
    deadline: "2024-07-01T00:00:00Z",
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
  {
    id: Math.random().toString(36).substring(2, 9),
    title: "Make Breakfast",
    description: "Make breakfast for the family",
    done: false,
    tags: ["cooking", "family", "breakfast", "early"],
    deadline: "2024-07-01T00:00:00Z",
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
];


export async function exportTodosAsJSON(todos: ITodo[]) {
  const blob = new Blob([JSON.stringify(todos, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "todos.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}



export async function exportTodoAsCSV(todos: ITodo[]) {
  const headers = [
    "id",
    "title",
    "description",
    "done",
    "createdAt",
    "updatedAt",
  ] as const ;

  // Convert todos to CSV format
  const rows = todos.map((todo: ITodo) => {
    return {
      ...todo,
      createdAt: moment(todo.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment(todo.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });

  const csvContent = [
    headers.join(","), // rows from header
    ...rows.map((todo) => headers.map((header) => todo[header]).join(",")), // data rows
  ].join("\n");

  // Create a Blob form the string
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" }); //this is a blob

  // Create a link to download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", "todos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
