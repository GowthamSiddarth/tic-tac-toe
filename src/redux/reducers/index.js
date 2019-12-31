import { combineReducers } from "redux";
import playerReducer from '../reducers/playerReducer';

export default combineReducers({
    player: playerReducer
});