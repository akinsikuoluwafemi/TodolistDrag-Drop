import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';


// custome render function that wraps the component with a reduc provider
const renderWithProviders = (ui: ReactElement, options?: any) => {
  const routes = [
    {
      path: "*",
      element: ui, //render the component under test
    },
  ];

  const router = createMemoryRouter(routes)

  return render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
    options
  );
}

//re-export everthing from testing-library/react
export * from '@testing-library/react';

//override the render method
export { renderWithProviders as render };