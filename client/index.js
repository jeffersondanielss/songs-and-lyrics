import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import SongsList from './components/SongsList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import requireAuth from './components/requireAuth'
import Login from './components/Login'
import Signup from './components/Signup'

const networkInterface = createNetworkInterface({
  uri: 'graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={requireAuth(SongsList)} />
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
          <Route path="songs/new" component={requireAuth(SongCreate)} />
          <Route path="songs/:id" component={requireAuth(SongDetail)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
