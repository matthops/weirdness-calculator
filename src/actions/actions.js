export const ADD_LIKED = 'ADD_LIKED';
export const REMOVE_LIKED = 'REMOVE_LIKED';
export const SHOW_WEIRDNESS_SCORE = 'SHOW_WEIRDNESS_SCORE';

export const addLiked = (text, score, searchTerm) => {
  console.log(text);
  return { type: ADD_LIKED, gif: { text, score, searchTerm } };
};

export const removeLiked = url => {
  return { type: REMOVE_LIKED, url };
};

export const showWeirdnessScore = bool => {
  return { type: SHOW_WEIRDNESS_SCORE, bool };
};
