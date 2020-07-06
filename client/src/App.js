import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <SignUp />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </div>
  )
};

export default App;