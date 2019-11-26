import React, { useState, useEffect } from 'react';
import store from './reducers/likedReducer';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Main from './components/Main';
import WeirdnessScore from './components/WeirdnessScore';
import './styles/app.scss';

function App() {
  const [isWeirdnessDisplayed, setIsWeirdnessDisplayed] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    store.subscribe(() => {
      if (isSubscribed) setIsWeirdnessDisplayed(store.getState().showWeirdness);
    });

    return () => (isSubscribed = false);
  }, [isWeirdnessDisplayed]);

  return (
    <div className="App">
      <header className="App-header">Weirdness Calculator</header>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          {isWeirdnessDisplayed ? (
            <Route path="/results" component={WeirdnessScore} />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default connect()(App);
