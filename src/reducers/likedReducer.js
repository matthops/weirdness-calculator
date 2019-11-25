import { createStore } from 'redux';

const initialState = {
  likedList: []
};

const ADD_LIKED = 'ADD_LIKED';
// const REMOVE_LIKED = 'REMOVE_LIKED';

const likedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKED:
      console.log(state);
      return Object.assign({}, state, {
        likedList: [...state.likedList, action.text]
      });
    // case REMOVE_LIKED:
    //   return Object.assign({}, state, {
    //     likedList: action.payload.data
    //   });
    default:
      return state;
  }
};

const store = createStore(likedReducer);

export default store;
