import { createStore } from 'redux';
import {
  ADD_LIKED,
  REMOVE_LIKED,
  SHOW_WEIRDNESS_SCORE,
  START_OVER
} from './../actions/actions';

const initialState = {
  likedList: [],
  searchTerms: [],
  showWeirdness: false,
  scoreSum: 0
};

const likedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKED:
      return Object.assign({}, state, {
        likedList: [...state.likedList, action.gif],
        searchTerms: [...state.searchTerms, action.gif.searchTerm],
        scoreSum: state.scoreSum + action.gif.score
      });
    case REMOVE_LIKED:
      //Filter out gif to be removed from state
      const newList = state.likedList.filter(item => {
        return item.gifObj.id !== action.id;
      });
      //Grab the weirdness score off of the state to be removed to update the weirdness score
      let itemScore;
      state.likedList.forEach(item => {
        if (item.gifObj.id === action.id) {
          itemScore = item.score;
        }
      });
      return Object.assign({}, state, {
        likedList: newList,
        scoreSum: state.scoreSum - itemScore
      });
    case SHOW_WEIRDNESS_SCORE:
      return Object.assign({}, state, {
        showWeirdness: action.bool
      });
    case START_OVER:
      return Object.assign({}, state, {
        likedList: [],
        searchTerms: [],
        showWeirdness: false,
        scoreSum: 0
      });
    default:
      return state;
  }
};

const store = createStore(likedReducer);

export default store;
