import { useState } from "react";
import { Link, Outlet} from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TodoCard from "../components/TodoCard";
import TodoForm from "../components/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  reorderTodos,
  searchTodos,
  setTodos,
} from "../state/todos/todoSlice";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { LocalStorageService } from "../services/LocalStorageServices";
import { ITodo } from "../types";
import { BaseServices } from "../services/baseServices";
import SearchTodo from "../components/SearchTodo";
import SortTodoByTags from "../components/SortTodoByTags";

const ListTodo = () => {
  const [query, setQuery] = useState("");
  const allTodos = useSelector(selectTodos);
  const dispatch = useDispatch();
  

  const onDragEnd = async (result: {}) => {
    const { source, destination } = result;

    // If there's no destination, do nothing
    if (!destination) {
      return;
    }
    // Log the drag result
    const fromIndex = source.index;
    const toIndex = destination.index;
    // Log indices
  
    // Validate indices before performing the move operation
    if (
      fromIndex < 0 ||
      fromIndex >= allTodos.length ||
      toIndex < 0 ||
      toIndex >= allTodos.length
    ) {
      console.error("Invalid indices detected", {
        fromIndex,
        toIndex,
        allTodosLength: allTodos.length,
      });
      return;
    }
    // Reorder the todos
    const newTodos = moveArrayElement([...allTodos], fromIndex, toIndex); // Create a copy of allTodos
    // Dispatch action to update the state
    dispatch(reorderTodos(newTodos));
    //set the new order to the local storage
    await LocalStorageService.set("todos", newTodos);
    // Additional action if needed
  };

  function moveArrayElement(arr: ITodo[], fromIndex: number, toIndex: number) {
    if (
      fromIndex < 0 ||
      fromIndex >= arr.length ||
      toIndex < 0 ||
      toIndex >= arr.length
    ) {
      throw new Error("Invalid indices");
    }
    // Remove the element from the original position
    const [element] = arr.splice(fromIndex, 1);
    // Insert the element at the new position
    arr.splice(toIndex, 0, element);
    return arr;
  }


  // const debouncedSearch = useCallback(debounce((newValue) => {

  // },3000) , [])

  const fetchAllTodos = async () => {
    try {
      const todos = await BaseServices.getTodos();
      dispatch(setTodos(todos));
    } catch (e: any) {
      console.error(e.message);
    }
  };
  // LocalStorageService.remove("todos").then((t) => t);



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setQuery(newValue);
    // update the URL parameters
    const url = new URL(window.location.href);
    url.search = `?q=${newValue}`;
    dispatch(searchTodos(newValue));
    if (allTodos.length === 0 && newValue === "") {
      fetchAllTodos();
    } else {
      dispatch(searchTodos(newValue));
    }

  };



  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      //the overall container
      //dragdropcontext
    >
      <Box>
        <SearchTodo
          handleInputChange={handleInputChange}
          query={query}
          setQuery={setQuery}
          fetchAllTodos={fetchAllTodos}
        />
        <br />
        {/*  */}
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Create Todo
        </Typography>
        {/* form */}
        <TodoForm action="/" type="create" />
        <SortTodoByTags />
        <br/>
        {/* form */}
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          List All Todo
        </Typography>
        <div
          style={{
            // background: "teal",
            padding: "1rem",
            //droppable
          }}
          data-testid="todo-list"
        >
          {allTodos.map((todo, index) => (
            <Droppable droppableId={todo.id.toString()} key={todo.id}>
              {(provided) => (
                <Link
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  to={`/todos/${todo.id}`}
                >
                  <TodoCard todo={todo} index={index} />
                  {provided.placeholder}
                </Link>
              )}
            </Droppable>
          ))}
          {allTodos.length === 0 && (
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              No Todo Found
            </Typography>
          )}
        </div>
      </Box>
      <Box id="detail">
        <Outlet />
      </Box>
    </DragDropContext>
  );
};

export default ListTodo;
