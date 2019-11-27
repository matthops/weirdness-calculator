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

  const countdown = likedGifsArr.likedList
    ? 5 - likedGifsArr.likedList.length
    : 5;

  return (
    <div className="liked-gifs-container">
      YOUR LIKED GIFS
      <div className="liked-gifs-box">
        {likedGifsArr.likedList.map((e, i) => {
          if (i <= 3) {
            return (
              <div key={i} className="inner-gifs-box">
                <GifBox
                  url={e.gifObj.images.original.url}
                  title={e.gifObj.title}
                />

                <button onClick={() => store.dispatch(removeLiked(e))}>
                  {' '}
                  remove{' '}
                </button>
              </div>
            );
          }
        })}
      </div>
      <div>
        <Link to="/results">
          <button
            disabled={likedGifsArr.likedList.length < 5 ? true : false}
            onClick={() => store.dispatch(showWeirdnessScore(true))}
          >
            {' '}
            CALCULATE MY WEIRDNESS SCORE
          </button>
        </Link>
        <div>{`You must like ${countdown} more GIFs to calculate your score`}</div>
      </div>
    </div>
  );
}

export default connect()(LikedGifs);
