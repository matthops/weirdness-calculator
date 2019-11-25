import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { removeLiked, showWeirdnessScore } from './../actions/actions';

function LikedGifs() {
  const [likedGifsArr, setLikedGifsArr] = useState(() => store.getState());

  useEffect(() => {
    store.subscribe(() => setLikedGifsArr(store.getState()));
  }, [likedGifsArr]);

  return (
    <div>
      <button
        disabled={likedGifsArr.likedList.length < 4 ? true : false}
        onClick={() => store.dispatch(showWeirdnessScore(true))}
      >
        {' '}
        Show me my weirdness
      </button>
      {likedGifsArr.likedList.map((e, i) => {
        return (
          <div key={i}>
            <img src={e.text} />
            <button onClick={() => store.dispatch(removeLiked(e))}>
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
