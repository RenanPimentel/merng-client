import React from "react";
import ReactDOM from "react-dom";
import MyApolloProvider from "./MyApolloProvider";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <MyApolloProvider />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
