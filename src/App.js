import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AddClient from './components/clients/AddClient'
import NotFound from './components/layout/NotFound'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/client/add" component={AddClient}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
// The exact param disables the partial matching for a route and makes 
//sure that it only returns the route if the path is an EXACT match to the current url.