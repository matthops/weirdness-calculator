import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { removeLiked, showWeirdnessScore } from './../actions/actions';
import { Link } from 'react-router-dom';
import GifBox from './GifBox';
import './../styles/likedGifs.scss';

function LikedGifs() {
  const [likedGifsArr, setLikedGifsArr] = useState(() => store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setLikedGifsArr(store.getState())
    );

    return () => unsubscribe();
  }, [likedGifsArr]);

  return (
    <div className="liked-gifs-container">
      YOUR LIKED GIFS
      <div className="liked-gifs-box">
        {likedGifsArr.likedList.map((e, i) => {
          return (
            <div key={i} className="inner-gifs-box">
              <GifBox url={e.text} />
              <button onClick={() => store.dispatch(removeLiked(e))}>
                {' '}
                remove{' '}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <Link to="/results">
          <button
            disabled={likedGifsArr.likedList.length < 4 ? true : false}
            onClick={() => store.dispatch(showWeirdnessScore(true))}
          >
            {' '}
            CALCULATE MY WEIRDNESS SCORE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default connect()(LikedGifs);
