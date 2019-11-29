import React from 'react';
import './../styles/gifBox.scss';

export default function GifBox(props) {
  return (
    <div className="search-result-text-box">
      <div className="gif-title">
        {// Capitalizes first letter in title
        props.title.charAt(0).toUpperCase() + props.title.substring(1)}
      </div>
      <div className="aspect-ratio">
        <img
          src={props.url}
          alt={props.title}
          className="aspect-ratio__inside"
        />
        {//Ternary to determine if remove button should be displayed on hover
        props.removeLiked ? (
          <button className="remove-gif" onClick={props.removeLiked}>
            X
          </button>
        ) : null}
      </div>
    </div>
  );
}
