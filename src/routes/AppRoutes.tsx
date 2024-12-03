import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ListTodo from "../pages/ListTodo";
import HomePage from "../pages/HomePage";
import SingleTodo from "../pages/SingleTodo";
import EditTodo from "../pages/EditTodo";
import { loader as editTodoLoader } from "../pages/EditTodo";
import FlexAndGrid from "../pages/FlexAndGrid";
import Grid from "../pages/Grid";
import DisplayLocations from "../pages/Locations";
import DisplayDogs from "../pages/DisplayDogs";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<ListTodo />}
        errorElement={<div>Failed to load</div>} // errorElement is optional
      >
        <Route errorElement={<div>Failed to Load</div>}>
          <Route index element={<HomePage />} />
          <Route path="/todos/:todoId" element={<SingleTodo />} />
          <Route
            path="/todos/:todoId/edit"
            loader={editTodoLoader}
            element={<EditTodo />}
          />
        </Route>
      </Route>
      <Route path="/flex" element={<FlexAndGrid />} />
      <Route path="/grid" element={<Grid />} />
      <Route path="/locations" element={<DisplayLocations />} />
      <Route path="/dogs" element={<DisplayDogs />} />
    </>
  )
);