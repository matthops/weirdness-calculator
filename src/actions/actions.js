export const ADD_LIKED = 'ADD_LIKED';

export const addLiked = text => {
  console.log(text);
  return { type: ADD_LIKED, text };
};
