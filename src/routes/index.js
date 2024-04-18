import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => {
  return (
    <Switch>
      <Route path="/home" component={asyncComponent(() => import('./Home'))}/>
      <Route path="/welcome" component={asyncComponent(() => import('./Welcome'))}/>
      <Route path="/signin" component={asyncComponent(() => import('./SignIn'))}/>
    </Switch>
  )
}

export default App;
