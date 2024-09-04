import {  useParams } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import { useSelector } from 'react-redux';
import { selectTodos } from '../state/todos/todoSlice';


const SingleTodo = () => {
  const params = useParams();
  const allTodos = useSelector(selectTodos);
  const todo = allTodos.find((todo) => todo.id === params?.todoId);


  return (
    <div>
      <TodoCard todo={todo} showActions />
    </div>
  );
}

export default SingleTodo