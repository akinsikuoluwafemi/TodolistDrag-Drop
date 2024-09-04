import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from "./routes/AppRoutes";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from "./state/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
