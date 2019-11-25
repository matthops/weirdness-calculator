import React from 'react';
import Search from './components/Search';
import LikedGifs from './components/LikedGifs';
import { connect } from 'react-redux';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>Weirdness Calculator</header>
      <Search />
      <LikedGifs />
    </div>
  );
}

export default connect()(App);
