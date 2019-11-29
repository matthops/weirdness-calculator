import React from 'react';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { connect } from 'react-redux';
import GifBox from './GifBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import './../styles/searchResult.scss';

function SearchResult(props) {
  return (
    <div className="search-result-container">
      <div className="search-result-container__header">YOUR RESULT</div>
      {//ternary to determine whether or not a gif or error/informational text needs to be displayed to the user
      props.gifSrc ? (
        <div className="inner-search-container">
          <GifBox url={props.gifSrc} title={props.title} />

          <Button
            color="default"
            aria-label="Like this gif"
            onClick={props.addToLikedGifs}
            className="like-button"
          >
            <ThumbUpIcon />
          </Button>
        </div>
      ) : (
        <div className="inner-search-container empty">
          <div className="aspect-ratio">
            <div className="aspect-ratio__inside">
              {//Ternary to determine if error message or Loading... should be displayed
              props.errorMessage !== null ? (
                props.errorMessage
              ) : props.isLoading === true ? (
                <CircularProgress />
              ) : (
                `To look for a gif, enter a term in the search box above, then set the weirdness
              below.`
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect()(SearchResult);

// 18007098348 Covered CA
