import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//implement store
import { Provider } from 'react-redux'
import store from './store'



import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AddClient from './components/clients/AddClient'
import NotFound from './components/layout/NotFound'
import Details from './components/clients/Details';
import EditClient from './components/clients/EditClient';

import './App.css';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/client/add" component={AddClient}/>
            <Route exact path="/client/:id" component={Details}/>
            <Route exact path="/client/edit/:id" component={EditClient}/>
            <Route component={NotFound}/>
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