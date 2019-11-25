import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';
import { connect } from 'react-redux';
import { showWeirdnessScore } from './../actions/actions';

function WeirdnessScore() {
  return (
    <div>
      WeirdnessScore
      <button onClick={() => store.dispatch(showWeirdnessScore(false))}>
        Go back{' '}
      </button>
    </div>
  );
}

export default connect()(WeirdnessScore);
