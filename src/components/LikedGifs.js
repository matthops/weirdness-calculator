import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { removeLiked } from './../actions/actions';

function LikedGifs() {
  const [reduxState, setReduxState] = useState(() => store.getState());

  useEffect(() => {
    console.log('useEffect', reduxState);
    store.subscribe(() => setReduxState(store.getState()));
  }, [reduxState]);

  return (
    <div>
      LikedGifs
      {reduxState.likedList.map((e, i) => {
        return (
          <div key={i}>
            <img src={e.text} />
            <button onClick={() => store.dispatch(removeLiked(e.text))}>
              {' '}
              remove{' '}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default connect()(LikedGifs);
