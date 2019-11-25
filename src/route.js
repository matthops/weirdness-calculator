import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import WeirdnessScore from './components/WeirdnessScore';

const Routes = ({ bool }) => (
  <Switch>
    <Route exact path="/" component={App} />

    {bool ? (
      <Route path="/results" component={WeirdnessScore} />
    ) : (
      <Redirect to="/" />
    )}
  </Switch>
);

export default Routes;
