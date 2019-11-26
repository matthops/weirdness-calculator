import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { removeLiked, showWeirdnessScore } from './../actions/actions';
import { Link } from 'react-router-dom';

function LikedGifs() {
  const [likedGifsArr, setLikedGifsArr] = useState(() => store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setLikedGifsArr(store.getState())
    );

    return () => unsubscribe();
  }, [likedGifsArr]);

  return (
    <div>
      <Link to="/results">
        <button
          disabled={likedGifsArr.likedList.length < 4 ? true : false}
          onClick={() => store.dispatch(showWeirdnessScore(true))}
        >
          {' '}
          Show me my weirdness
        </button>
      </Link>
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
