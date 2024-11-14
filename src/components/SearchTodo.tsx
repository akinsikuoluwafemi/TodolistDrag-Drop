import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { searchTodos,  } from '../state/todos/todoSlice';
import { Form } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';

interface SearchTodoProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  fetchAllTodos: () => void,
  setQuery: (query: string) => void
  query: string
}

const SearchTodo = ({ handleInputChange, fetchAllTodos,setQuery,query
 }: SearchTodoProps) => {
  const dispatch = useDispatch();
  // const allTodos = useSelector(selectTodos);

  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramQuery = searchParams.get("q");
    if (paramQuery) {
      setQuery(paramQuery);
      dispatch(searchTodos(paramQuery));
    } else {
      fetchAllTodos();
    }
  }, [dispatch]);

  useEffect(() => {
    if (query) {
      dispatch(searchTodos(query));
    } else {
      dispatch(searchTodos(query));
    }
  }, [query]);

  return (
    <Form id="search-form" role="search">
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Search Todo
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Todo"
        margin="normal"
        type="text"
        name="q"
        // defaultValue={query} // search query
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default SearchTodo