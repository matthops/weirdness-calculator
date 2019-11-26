import React, { useState } from 'react';
import axios from 'axios';

export default function SearchTest() {
  const [inputVal, setInputVal] = useState('');

  const handleSearch = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/translate?api_key=nmFzmNm0JGwZCNIrWe74T0YTXMt1snmz&s=hello`
      )
      .then(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleSearch}> Click me</button>
    </div>
  );
}
