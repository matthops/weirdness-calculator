import React from 'react';
import Search from './Search';
import LikedGifs from './LikedGifs';
import './../styles/main.scss';

export default function Main() {
  return (
    <div className="main-container">
      <Search />
      <LikedGifs />
    </div>
  );
}
