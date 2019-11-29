import React, { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import store from './../reducers/likedReducer';
import { addLiked } from './../actions/actions';
import { Typography, InputLabel, TextField } from '@material-ui/core';
import './../styles/search.scss';

export default function Search() {
  const [inputVal, setInputVal] = useState('');
  const [giphyResult, setGiphyResult] = useState(null);
  //weirdness is set by the slider
  const [weirdness, setWeirdness] = useState(0);
  //searchedWeirdness is the weirdness score that was used in the Giphy API search and needs to be separate so the score that is submitted when a gif is liked is accurate, since the user can change the weirdness score for additional searches
  const [searchedWeirdness, setSearchedWeirdness] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Redux for tracking search terms to prevent repeat term searches
  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setSearchTerms(store.getState().searchTerms)
    );
    return () => unsubscribe();
  }, [searchTerms]);

  // function to retrieve search results from the Giphy API Translate endpoint, with weirdness param included. This will return a single data object.
  const handleSearch = e => {
    e.preventDefault();
    let isSearchable = true;
    //clear out current giphyResult
    setGiphyResult(null);
    //Trigger loading indicator
    setIsLoading(true);
    //In case there was an error message in state, removes error message
    setErrorMessage(null);
    //Sets the weirdness score at the time of the search for the weirdness score sum
    setSearchedWeirdness(weirdness);
    let usedTerm;

    // checking to see if search term is a duplicate
    searchTerms.forEach(term => {
      //Conditional to check if any search terms match current input
      if (term.toLowerCase() === inputVal.toLowerCase()) {
        usedTerm = term;
        setInputVal('');
        setGiphyResult(null);
        //flag to prevent axios search and set error message if conditions are met
        isSearchable = false;
      }
    });

    //function to reset loading flag state and update giphy result
    const updateSearchResult = e => {
      setIsLoading(false);
      setGiphyResult(e.data.data);
    };
    //Ternary to prevent giphy call if search term matches a previously searched string, if there are no conflicts, an axios call to the Giphy API is triggered.
    isSearchable
      ? axios
          .get(
            `https://api.giphy.com/v1/gifs/translate?api_key=nmFzmNm0JGwZCNIrWe74T0YTXMt1snmz&weirdness=${weirdness}&s=${inputVal.replace(
              ' ',
              '+'
            )}`
          )
          .then(e => {
            return e.data.data.id
              ? updateSearchResult(e)
              : setErrorMessage(
                  `There are no results for this term. Please enter a new term and hit search`
                );
          })
          .catch(err => {
            setErrorMessage(
              `We've hit an error! Please enter a new term and hit search`
            );
          })
      : setErrorMessage(
          `You've already looked for ${usedTerm}, please select another term and hit search`
        );
  };

  //function to update redux with relevant information to display gif in other components and reset searchresult info
  const handleAddToLikedGifs = () => {
    store.dispatch(addLiked(giphyResult, searchedWeirdness, inputVal));
    setInputVal('');
    setGiphyResult(null);
  };

  //main component return
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
        <SearchResult
          // passes url for gif from giphy response object, passes null if search hasn't been performed yet.
          gifSrc={giphyResult ? giphyResult.images.original.url : null}
          title={giphyResult ? giphyResult.title : null}
          addToLikedGifs={handleAddToLikedGifs}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
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
