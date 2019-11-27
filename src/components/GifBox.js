import React from 'react';
import './../styles/gifBox.scss';

export default function GifBox(props) {
  return (
    <div className="search-result-text-box">
      <div className="gif-title">
        {' '}
        {props.title.charAt(0).toUpperCase() + props.title.substring(1)}
      </div>
      <div className="aspect-ratio">
        <img
          src={props.url}
          alt="placeholder"
          className="aspect-ratio__inside"
        />
        {props.removeLiked ? (
          <button className="remove-gif" onClick={props.removeLiked}>
            X
          </button>
        ) : null}
      </div>
    </div>
  );
}
