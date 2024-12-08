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
  gql,
  // gql,
} from "@apollo/client";
import { link } from './schema';


import "react-toastify/dist/ReactToastify.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { createFragmentRegistry } from '@apollo/client/cache';



const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  // uri: "https://dog.ceo/api",
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
     fragment ItemFragment on Item {
      id
      text
     }
    `),
  }),
  // link
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
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <ToastContainer />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
