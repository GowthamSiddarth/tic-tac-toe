import { combineReducers } from "redux";
import playerReducer from '../reducers/playerReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    player: playerReducer,
    error: errorReducer
});