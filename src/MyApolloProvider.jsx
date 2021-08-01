import React from "react";
import App from "./App";
import { setContext } from "apollo-link-context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

const httpLink = createHttpLink({ uri: "http://localhost:5000" });

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
