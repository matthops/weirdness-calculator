import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { showWeirdnessScore } from './../actions/actions';

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
      {weirdnessScore / totalGifs}
      <button onClick={() => store.dispatch(showWeirdnessScore(false))}>
        Go back{' '}
      </button>
    </div>
  );
}

export default connect()(WeirdnessScore);
