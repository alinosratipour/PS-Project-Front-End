import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App'; // Your main React component
import apolloClient from './apolloClient'



ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
