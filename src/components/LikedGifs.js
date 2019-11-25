import React, { useState, useEffect } from 'react';
import store from './../reducers/likedReducer';

export default function LikedGifs() {
  const [reduxState, setReduxState] = useState(() => store.getState());

  useEffect(() => {
    console.log('useEffect', reduxState);
    store.subscribe(() => setReduxState(store.getState()));
  }, [reduxState]);

  return (
    <div>
      LikedGifs
      {reduxState.likedList.map((e, i) => {
        return <img key={i} src={e} />;
      })}
    </div>
  );
}
