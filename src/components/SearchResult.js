import React from 'react';

export default function SearchResult(props) {
  return <div>{props.gifSrc ? <img src={props.gifSrc} /> : null}</div>;
}
