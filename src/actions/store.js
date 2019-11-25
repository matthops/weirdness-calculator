import { createStore } from 'redux';
import reducer from './../reducers/likedReducer';

const store = createStore(reducer);

export default store;
