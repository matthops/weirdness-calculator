import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { removeLiked, showWeirdnessScore } from './../actions/actions';
import { Link } from 'react-router-dom';
import GifBox from './GifBox';
import { Typography } from '@material-ui/core';
import './../styles/likedGifs.scss';

function LikedGifs() {
  const [likedGifsArr, setLikedGifsArr] = useState(() => store.getState());

  //Redux effect to track updated liked Gifs
  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setLikedGifsArr(store.getState())
    );
    return () => unsubscribe();
  }, [likedGifsArr]);

  // Ternary variable to calculate number of liked gifs needed to display weirdness score
  const countdown = likedGifsArr.likedList
    ? 5 - likedGifsArr.likedList.length
    : 5;

  return (
    <div className="liked-gifs-container">
      <div className="liked-gifs-container__headline">YOUR LIKED GIFS</div>
      <div className="liked-gifs-box">
        {likedGifsArr.likedList.map((e, i) => {
          //conditional to limit the number of liked gifs displayed to four
          return i <= 3 ? (
            <div key={i} className="inner-gifs-box">
              <GifBox
                url={e.gifObj.images.original.url}
                title={e.gifObj.title}
                removeLiked={() => store.dispatch(removeLiked(e.gifObj.id))}
              />
            </div>
          ) : null;
        })}
      </div>
      <div>
        <Link to="/results">
          <button
            className="show-weirdness-button"
            disabled={likedGifsArr.likedList.length < 5 ? true : false}
            onClick={() => {
              store.dispatch(showWeirdnessScore(true));
            }}
          >
            {' '}
            <Typography> CALCULATE MY WEIRDNESS SCORE</Typography>
          </button>
        </Link>
        <div>
          {`You must `}
          <em>Like</em>
          {` ${countdown >= 0 ? countdown : 0} more GIF${
            countdown === 1 ? '' : 's'
          } to calculate your score`}
        </div>
      </div>
    </div>
  );
}

export default connect()(LikedGifs);
