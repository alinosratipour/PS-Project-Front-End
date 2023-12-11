// Wrap your top-level component (e.g., App) with AvailableBasesProvider
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import apolloClient from "./apolloClient";
import ContextProvider from './components/Context/ContextProvider';
import "./globalStyles.scss";
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
  <ContextProvider>
    <App />
  </ContextProvider>
</ApolloProvider>,
  document.getElementById("root")
);
