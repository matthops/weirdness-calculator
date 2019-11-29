import React, { useState } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { startOver } from './../actions/actions';
import GifBox from './GifBox';
import { Typography } from '@material-ui/core';
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
        ${
          weirdnessScore > 0
            ? Math.round(weirdnessScore / totalGifs.length)
            : weirdnessScore
        }/10 on the weirdness
        scale!`}
      </div>
      <div className="weirdness-gif-container">
        {totalGifs.map((e, i) => {
          return (
            <div key={i} className="inner-gifs-box">
              <GifBox
                url={e.gifObj.images.original.url}
                title={e.gifObj.title}
              />
            </div>
          );
        })}
      </div>
      <div className="weirdness-button-section">
        <button
          id="weirdness-button-start-over"
          onClick={() => {
            store.dispatch(startOver());
          }}
        >
          <Typography variant="button"> START OVER</Typography>
        </button>
      </div>
    </div>
  );
}

export default connect()(WeirdnessScore);
