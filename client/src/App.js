import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Navbar />
      <Route path='/' exact component={Landing} />
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Provider>
);

export default App;
