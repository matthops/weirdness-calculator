import React, { useState } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { startOver } from './../actions/actions';
import GifBox from './GifBox';
import './../styles/weirdnessScore.scss';

function WeirdnessScore() {
  // eslint-disable-next-line no-unused-vars
  const [weirdnessScore, setWeirdnessScore] = useState(
    () => store.getState().scoreSum
  );
  // eslint-disable-next-line no-unused-vars
  const [totalGifs, setTotalGifs] = useState(() => store.getState().likedList);

  return (
    <div className="weirdness-score-container">
      <div className="weirdness-score-container__headline">
        {`You scored
        ${Math.round(weirdnessScore / totalGifs.length)}/10 on the weirdness
        scale!`}
      </div>
      <div className="weirdness-gif-container">
        {totalGifs.map((e, i) => {
          return (
            <div className="inner-gifs-box">
              <GifBox
                url={e.gifObj.images.original.url}
                title={e.gifObj.title}
                key={i}
              />
            </div>
          );
        })}
      </div>
      <div className="weirdness-button-section">
        <button
          onClick={() => {
            store.dispatch(startOver());
          }}
        >
          Start Over{' '}
        </button>
      </div>
    </div>
  );
}

export default connect()(WeirdnessScore);
