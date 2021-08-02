import React from "react";
import App from "./App";
import { setContext } from "apollo-link-context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://rocky-waters-58515.herokuapp.com/",
});

const authLinks = setContext(() => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLinks.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApolloProvider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default MyApolloProvider;
