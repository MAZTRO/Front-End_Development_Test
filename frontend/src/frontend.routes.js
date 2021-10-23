import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login'
import Welcome from './pages/welcome/Welcome'
import ToDO from './pages/to-do/ToDO'

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/welcome" component={Welcome}/>
          <Route exact path="/to-do" component={ToDO}/>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes