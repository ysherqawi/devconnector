import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <Fragment>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </Fragment>
);

export default App;
