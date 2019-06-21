import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

//implement store
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AddClient from './components/clients/AddClient';
import NotFound from './components/layout/NotFound';
import Details from './components/clients/Details';
import EditClient from './components/clients/EditClient';
import Settings from './components/settings/Settings'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={ UserIsAuthenticated(Dashboard)} />//user has to be authenticated
              <Route exact path="/settings" component={ UserIsAuthenticated(Settings)} />
              <Route exact path="/register" component={ UserIsNotAuthenticated( Register)} />
              <Route exact path="/login" component={UserIsNotAuthenticated(Login) } />
              <Route exact path="/client/add" component={UserIsAuthenticated( AddClient)} />
              <Route exact path="/client/:id" component={ UserIsAuthenticated( Details)} />
              <Route exact path="/client/edit/:id" component={ UserIsAuthenticated( EditClient)} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
// The exact param disables the partial matching for a route and makes
//sure that it only returns the route if the path is an EXACT match to the current url.
