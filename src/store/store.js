import { createStore } from 'redux';
import gameReducer from '../reducer/gameReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(gameReducer, composeWithDevTools());

export default store;