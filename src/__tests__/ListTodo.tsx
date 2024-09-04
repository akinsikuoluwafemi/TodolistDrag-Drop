
import { render, screen } from '../utils/test/test-utils';
import ListTodo from '../pages/ListTodo';
// src/setupTests.ts
import { expect, test } from 'vitest';


// describe('ListTodo', () => {

// })

test('renders ListTodo component', () => {
  render(<ListTodo />);
  const TodoList = screen.getByTestId('todo-list');
  expect(TodoList).toBeInTheDocument();
});

