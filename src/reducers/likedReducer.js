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
      const newList = state.likedList.filter(item => {
        return item.text !== action.url.text;
      });
      return Object.assign({}, state, {
        likedList: newList,
        scoreSum: state.scoreSum - action.url.score
      });
    case SHOW_WEIRDNESS_SCORE:
      console.log(action.bool);
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
