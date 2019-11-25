export const ADD_LIKED = 'ADD_LIKED';
export const REMOVE_LIKED = 'REMOVE_LIKED';

export const addLiked = (text, score) => {
  console.log(text);
  return { type: ADD_LIKED, gif: { text, score } };
};

export const removeLiked = url => {
  return { type: REMOVE_LIKED, url };
};
