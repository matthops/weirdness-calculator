export const ADD_LIKED = 'ADD_LIKED';
export const REMOVE_LIKED = 'REMOVE_LIKED';
export const SHOW_WEIRDNESS_SCORE = 'SHOW_WEIRDNESS_SCORE';
export const START_OVER = 'START_OVER';

export const addLiked = (gifObj, score, searchTerm) => {
  console.log(gifObj);
  return { type: ADD_LIKED, gif: { gifObj, score, searchTerm } };
};

export const removeLiked = id => {
  return { type: REMOVE_LIKED, id };
};

export const showWeirdnessScore = bool => {
  return { type: SHOW_WEIRDNESS_SCORE, bool };
};

export const startOver = () => {
  return { type: START_OVER };
};
