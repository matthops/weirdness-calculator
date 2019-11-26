import React from 'react';
import './../styles/gifBox.scss';

export default function GifBox(props) {
  return (
    // <div className="search-result-text-box">
    <div className="aspect-ratio">
      <img src={props.url} alt="placeholder" className="aspect-ratio__inside" />
    </div>
    // </div>
  );
}
