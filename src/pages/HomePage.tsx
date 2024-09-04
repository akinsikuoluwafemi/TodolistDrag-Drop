import { Typography } from "@mui/material"
import { BaseServices } from "../services/baseServices";
import { exportTodoAsCSV, exportTodosAsJSON } from '../utils';



const HomePage = () => {
  return (
    <div>
      <Typography>Welcome to ElNiNo ToDo App</Typography>
      <button
        onClick={async() => {
          const todos = await BaseServices.getTodos();
            if (todos) {
              exportTodosAsJSON(todos);
            }
        }}
      >Export as JSON</button>
      &nbsp;
      &nbsp;
      <button
        onClick={async() => {
          const todos = await BaseServices.getTodos();
            if (todos) {
              exportTodoAsCSV(todos);
            }
        }}
      >Export as CSV</button>
    </div>
  );
}

export default HomePage