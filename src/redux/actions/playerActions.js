import axios from 'axios';
import { ERROR, CREATE_PLAYER } from "./types";

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