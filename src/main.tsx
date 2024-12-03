import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from "./routes/AppRoutes";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from "./state/store";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // gql,
} from "@apollo/client";


import "react-toastify/dist/ReactToastify.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";



const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  // uri: "https://dog.ceo/api",
  cache: new InMemoryCache(),
});


// client.query({
//   query: gql`
//    query GetLocations {
//     locations{
//       id
//       name
//       description
//       photo
//     }
//    }
//   `
// }).then((result) => console.log(result));


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
