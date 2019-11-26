import React, { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import store from './../reducers/likedReducer';
import { addLiked } from './../actions/actions';

export default function Search() {
  const [inputVal, setInputVal] = useState('');
  const [giphyResults, setGiphyResults] = useState(null);
  const [weirdness, setWeirdness] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setSearchTerms(store.getState().searchTerms)
    );

    return () => unsubscribe();
  }, [searchTerms]);

  // function to retrieve search results from the Giphy API Translate endpoint, with weirdness param included. This will return a single data object.
  const handleSearch = () => {
    let isSearchable = true;
    let usedTerm;
    searchTerms.forEach(term => {
      if (term.toLowerCase() === inputVal.toLowerCase()) {
        usedTerm = term;
        setInputVal('');
        setGiphyResults(null);
        isSearchable = false;
      }
    });

    isSearchable
      ? axios
          .get(
            `https://api.giphy.com/v1/gifs/translate?api_key=mE4m0eTkyT9EpOLroGJG2idYH7QUTPpp&weirdness=${weirdness}&s=${inputVal}`
          )
          .then(e => setGiphyResults(e.data.data))
      : alert(
          `You've alread looked for ${usedTerm}, pleas select another term and hit search`
        );
  };

  const handleAddToLikedGifs = () => {
    store.dispatch(
      addLiked(giphyResults.images.original.url, weirdness, inputVal)
    );
    setInputVal('');
    setGiphyResults(null);
  };

  return (
    <div>
      <input
        placeholder="Search Term"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
      />
      <Slider
        value={weirdness}
        onChange={(event, newValue) => setWeirdness(newValue)}
        min={0}
        max={10}
        step={1}
        aria-labelledby="continuous-slider"
      />
      Weirdness: {weirdness}
      <Button variant="contained" color="default" onClick={handleSearch}>
        {' '}
        Search
      </Button>
      <div>
        <SearchResult
          // passes url for gif from giphy response object, passes null if search hasn't been performed yet.
          gifSrc={giphyResults ? giphyResults.images.original.url : null}
          addToLikedGifs={handleAddToLikedGifs}
        />
      </div>
    </div>
  );
}
