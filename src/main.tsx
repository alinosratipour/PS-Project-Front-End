// Wrap your top-level component (e.g., App) with AvailableBasesProvider
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import apolloClient from "./apolloClient";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
