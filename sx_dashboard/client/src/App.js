import React, { Component } from 'react';
import Welcome from './components/Welcome';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Welcome />
      </ApolloProvider>
    );
  }
}

export default App;