

import TodoForm from '../components/TodoForm';
import { render, screen } from "../utils/test/test-utils";
// src/setupTests.ts
import { expect, test, describe } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { mockTodos } from '../utils/index';


describe("Form Test", () => {

  const TodoFormProps = {
    type: "create" as "edit" | "create",
    action: "" as string,
  }

  const allTodos = mockTodos;


  test("Form should have a title", () => {
    render(<TodoForm {...TodoFormProps} />);
    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
  });

  test("Form should have a description", () => {
    render(<TodoForm {...TodoFormProps} />);
    const description = screen.getByLabelText("Description");
    expect(description).toBeInTheDocument();
  });

  test("Form can submit a todo and it should be added to the list", async () => {
    render(<TodoForm {...TodoFormProps} />);

    const title = screen.getByLabelText("Title");
    const description = screen.getByLabelText("Description");
    const submitButton = screen.getByTestId("add-todo-btn");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // fill the form
    // Simulate user input
    fireEvent.change(title, { target: { value: "New Todo" } });
    fireEvent.change(description, {
      target: { value: "This is a new todo description" },
    });

    expect(title).toHaveValue("New Todo");
    expect(description).toHaveValue("This is a new todo description");

    const data = {
      title: 'New Todo',
      description: 'This is a new todo description',
      id: expect.any(String),
      deadline : expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }

    // / Simulate form submission
    fireEvent.click(submitButton);
    // // // Wait for async actions to complete and the new todo item to appear
    await waitFor(() => {
      const todo = allTodos.find((todo) => todo.title === data.title);
      expect(todo).toBeTruthy();
    });
  });
});