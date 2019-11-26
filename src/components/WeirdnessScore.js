import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { showWeirdnessScore, startOver } from './../actions/actions';

function WeirdnessScore() {
  const [weirdnessScore, setWeirdnessScore] = useState(
    () => store.getState().scoreSum
  );
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
