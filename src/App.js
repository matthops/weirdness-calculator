import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import LikedGifs from './components/LikedGifs';
import WeirdnessScore from './components/WeirdnessScore';
import store from './reducers/likedReducer';
import { connect } from 'react-redux';

import './App.css';

function App() {
  const [isWeirdnessDisplayed, setIsWeirdnessDisplayed] = useState(false);

  useEffect(() => {
    store.subscribe(() => {
      setIsWeirdnessDisplayed(store.getState().showWeirdness);
    });
  }, [isWeirdnessDisplayed]);

  return (
    <div className="App">
      <header>Weirdness Calculator</header>
      {isWeirdnessDisplayed ? (
        <WeirdnessScore />
      ) : (
        <div>
          <Search />
          <LikedGifs />
        </div>
      )}
    </div>
  );
}

export default connect()(App);
