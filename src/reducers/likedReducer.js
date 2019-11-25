import { createStore } from 'redux';
import {
  ADD_LIKED,
  REMOVE_LIKED,
  SHOW_WEIRDNESS_SCORE
} from './../actions/actions';

const initialState = {
  likedList: [],
  showWeirdness: false
};

const likedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKED:
      console.log('ADD_LIKED', state);
      return Object.assign({}, state, {
        likedList: [...state.likedList, action.gif]
      });
    case REMOVE_LIKED:
      const newList = state.likedList.filter(item => {
        return item.text !== action.url;
      });
      return Object.assign({}, state, {
        likedList: newList
      });
    case SHOW_WEIRDNESS_SCORE:
      console.log(action.bool);
      return Object.assign({}, state, {
        showWeirdness: action.bool
      });
    default:
      return state;
  }
};

const store = createStore(likedReducer);

export default store;
