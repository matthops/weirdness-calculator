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
          <GifBox url={props.gifSrc} title={props.title} />

          <IconButton
            color="default"
            aria-label="Like this gif"
            onClick={props.addToLikedGifs}
          >
            <ThumbUpIcon />
          </IconButton>
        </div>
      ) : (
        <div className="inner-search-container empty">
          <div className="aspect-ratio">
            <div className="aspect-ratio__inside">
              Look for a gif in the search box above!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect()(SearchResult);

// 18007098348 Covered CA
