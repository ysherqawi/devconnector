import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    //eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
