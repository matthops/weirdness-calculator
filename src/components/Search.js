import React, { useState } from 'react';
import SearchResult from './SearchResult';
import axios from 'axios';

export default function Search() {
  const [inputVal, setInputVal] = useState('');
  const [giphyResults, setGiphyResults] = useState(null);

  // function to retrieve search results from the Giphy API Translate endpoint. This will return a single data object.
  const handleSearch = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/translate?api_key=mE4m0eTkyT9EpOLroGJG2idYH7QUTPpp&s=${inputVal}`
      )
      .then(e => setGiphyResults(e.data.data));
  };

  return (
    <div>
      <input
        placeholder="Search Term"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
      />
      <button onClick={handleSearch}> Search</button>
      <div>
        <SearchResult
          // passes url for gif from giphy response object, passes null if search hasn't been performed yet.
          gifSrc={giphyResults ? giphyResults.images.original.url : null}
        />
      </div>
    </div>
  );
}
