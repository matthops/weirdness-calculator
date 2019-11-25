import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { connect } from 'react-redux';
import { addLiked } from './../actions/actions';
import store from './../reducers/likedReducer';

function SearchResult(props) {
  return (
    <div>
      {props.gifSrc ? (
        <div>
          <img src={props.gifSrc} />
          <IconButton
            color="default"
            aria-label="Like this gif"
            onClick={() => store.dispatch(addLiked(props.gifSrc, props.score))}
          >
            <ThumbUpIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}

export default connect()(SearchResult);
