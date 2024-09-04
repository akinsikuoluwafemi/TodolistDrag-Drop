import { LoaderFunctionArgs, useLoaderData} from "react-router-dom"
import { BaseServices } from "../services/baseServices"
import { ITodo } from "../types";
import TodoForm from "../components/TodoForm";


export async function loader({ params }: LoaderFunctionArgs) {
  const todo = await BaseServices.getTodo(params.todoId as string);
  if (!todo) {
    throw new Response("", {
      status: 404,
      statusText: "Todo not found",
    });
  }
  return todo;
}

const EditTodo = () => {
  const todo = useLoaderData() as ITodo;
  return (
    <div>
      <TodoForm action={`/todos/${todo.id}/edit`} todo={todo} type="edit" />
    </div>
  );
}

export default EditTodo