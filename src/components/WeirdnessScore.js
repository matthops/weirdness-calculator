import React, { useState } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { startOver } from './../actions/actions';

function WeirdnessScore() {
  // eslint-disable-next-line no-unused-vars
  const [weirdnessScore, setWeirdnessScore] = useState(
    () => store.getState().scoreSum
  );
  // eslint-disable-next-line no-unused-vars
  const [totalGifs, setTotalGifs] = useState(
    () => store.getState().likedList.length
  );

  return (
    <div>
      Average WeirdnessScore
      {Math.round(weirdnessScore / totalGifs)}
      <button
        onClick={() => {
          store.dispatch(startOver());
        }}
      >
        Start Over{' '}
      </button>
    </div>
  );
}

export default connect()(WeirdnessScore);
