import axios from 'axios';
import { ERROR, CREATE_PLAYER, CREATE_GAME_ROOM } from "./types";

export const createPlayer = (playerName) => dispatch => {
    axios.get('/api/v1/v0/create-player/' + playerName)
    .then(resp => dispatch({
        type: CREATE_PLAYER,
        payload: resp.data.message.player_id
    }))
    .catch(err => dispatch({
        type: ERROR,
        payload: err.response.data
    }));
}

export const createGameRoom = (reqBody) => dispatch => {
    axios.post('/api/v1/v0/create-game-room', reqBody)
    .then(resp => dispatch({
        type: CREATE_GAME_ROOM,
        payload: resp.data.message.game_room_id
    }))
    .catch(err => dispatch({
        type: ERROR,
        payload: err.response.data
    }))
};