import React from 'react';
import './App.css';
import './components/navBar'
import NavBar from './components/navBar';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import EmployeeList from './components/EmployeeList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <NavBar />
        <EmployeeList />
      </div>
    </ApolloProvider>
  );
}


export default App;
