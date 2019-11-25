import { createStore } from 'redux';

const initialState = {
  likedList: []
};

const ADD_LIKED = 'ADD_LIKED';
const REMOVE_LIKED = 'REMOVE_LIKED';

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
    default:
      return state;
  }
};

const store = createStore(likedReducer);

export default store;
