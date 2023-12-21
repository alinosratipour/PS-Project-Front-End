import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import apolloClient from "./apolloClient";
import ContextProvider from "./components/Context/ContextProvider";
import "./globalStyles.scss";

const root = document.getElementById("root");

if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(
    <ApolloProvider client={apolloClient}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ApolloProvider>
  );
}
// ReactDOM.render(

//   document.getElementById("root")
// );
