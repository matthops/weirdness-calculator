import React from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { connect } from 'react-redux';
import GifBox from './GifBox';
import './../styles/searchResult.scss';

function SearchResult(props) {
  return (
    <div className="search-result-container">
      <div className="search-result-container__header">YOUR RESULT</div>
      {props.gifSrc ? (
        <div className="inner-search-container">
          <GifBox url={props.gifSrc} />
          <IconButton
            color="default"
            aria-label="Like this gif"
            onClick={props.addToLikedGifs}
          >
            <ThumbUpIcon />
          </IconButton>
        </div>
      ) : (
        <div className="inner-search-container">
          Look for a gif in the search box above!
        </div>
      )}
    </div>
  );
}

export default connect()(SearchResult);
