import React, { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import store from './../reducers/likedReducer';
import { addLiked } from './../actions/actions';
import { Typography, InputLabel, TextField } from '@material-ui/core';
import Loading from './Loading';
import './../styles/search.scss';

export default function Search() {
  const [inputVal, setInputVal] = useState('');
  const [giphyResult, setGiphyResult] = useState(null);
  const [weirdness, setWeirdness] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setSearchTerms(store.getState().searchTerms)
    );

    return () => unsubscribe();
  }, [searchTerms]);

  // function to retrieve search results from the Giphy API Translate endpoint, with weirdness param included. This will return a single data object.
  const handleSearch = e => {
    e.preventDefault();
    debugger;
    let isSearchable = true;
    let usedTerm;
    setErrorMessage(null);
    // checking to see if search term is a duplicate
    searchTerms.forEach(term => {
      if (term.toLowerCase() === inputVal.toLowerCase()) {
        console.log('hit the if');
        usedTerm = term;
        setInputVal('');
        setGiphyResult(null);
        isSearchable = false;
      }
    });

    isSearchable
      ? axios
          .get(
            `https://api.giphy.com/v1/gifs/translate?api_key=nmFzmNm0JGwZCNIrWe74T0YTXMt1snmz&weirdness=${weirdness}&s=${inputVal}`
          )
          .then(e => {
            return e.data.data.id
              ? setGiphyResult(e.data.data) && setIsLoading(true)
              : setErrorMessage(
                  `There are no results for this term. Please enter a new term and hit search`
                );
          })
          .catch(err => {
            console.log(err.message, giphyResult);
            setErrorMessage(
              `We've hit an error! Please enter a new term and hit search`
            );
          })
      : setErrorMessage(
          `You've already looked for ${usedTerm}, please select another term and hit search`
        );
  };

  const handleAddToLikedGifs = () => {
    store.dispatch(addLiked(giphyResult, weirdness, inputVal));
    setInputVal('');
    setGiphyResult(null);
  };

  return (
    <div className="search-container">
      <div className="search-container__top">
        <div className="search-container__text">
          <Typography>
            {' '}
            Find out how wierd you are by selecting the GIFs that make you
            laugh. We'll show you the least weird ones to start, but you can
            move the slider to make them weirder.{' '}
          </Typography>
          <br />
          <Typography>
            When you find a GIF you like, press the Like button. Once you like 5
            GIFs, we'll show you how weird you are.
          </Typography>
        </div>
        <form className="search-form" onSubmit={e => handleSearch(e)}>
          <div>
            <InputLabel id="search-term__label" htmlFor="search-term">
              Search Term
            </InputLabel>
            <TextField
              type="search"
              pattern="[A-Za-z0-9]+"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              variant="outlined"
              id="search-term"
            />
          </div>
          <button id="search-button" onClick={e => handleSearch(e)}>
            <Typography variant="button"> Search</Typography>
          </button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <SearchResult
            // passes url for gif from giphy response object, passes null if search hasn't been performed yet.
            gifSrc={giphyResult ? giphyResult.images.original.url : null}
            title={giphyResult ? giphyResult.title : null}
            addToLikedGifs={handleAddToLikedGifs}
            errorMessage={errorMessage}
          />
        )}

        <div className="weirdness-slider">
          <Slider
            value={weirdness}
            onChange={(event, newValue) => setWeirdness(newValue)}
            min={0}
            max={10}
            step={1}
            aria-labelledby="continuous-slider"
          />
          Weirdness: {weirdness}
        </div>
      </div>
    </div>
  );
}
