import axios from 'axios';
import qs from "qs";

import { ERROR, CREATE_PLAYER, CREATE_GAME_ROOM, START_NEW_GAME, CLEAR_ERROR_MESSAGE, JOIN_GAME_ROOM, IS_MY_TURN, MAKE_A_MOVE } from "./types";

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
    axios.post('/api/v1/v0/create-game-room', qs.stringify(reqBody))
        .then(resp =>
            dispatch({
                type: CREATE_GAME_ROOM,
                payload: resp.data.message.game_room_id
            })
        )
        .catch(err => dispatch({
            type: ERROR,
            payload: err.response.data.message
        }));
};

export const joinGameRoom = (reqBody) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/v0/join-game-room', qs.stringify(reqBody))
            .then(resp => {
                dispatch({
                    type: JOIN_GAME_ROOM,
                    payload: reqBody.gameRoomId
                });

                resolve(resp.data);
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.response.data.message
                });

                reject(err.response.data)
            });
    });
};

export const startNewGame = (reqBody) => dispatch => {
    axios.post('/api/v1/v0/start-new-game', qs.stringify(reqBody))
        .then(resp => dispatch({
            type: START_NEW_GAME,
            payload: resp.data.message
        }))
        .catch(err => dispatch({
            type: ERROR,
            payload: err.response.data.message
        }));
}

export const makeAMove = (reqBody) => dispatch => {
    axios.post('/api/v1/v0/make-a-move', qs.stringify(reqBody))
        .then(resp => dispatch({
            type: MAKE_A_MOVE,
            payload: resp.data.message
        }))
        .catch(err => dispatch({
            type: ERROR,
            payload: err.response.data.message
        }));
}

export const isMyTurn = (reqBody) => dispatch => {
    axios.post('/api/v1/v0/is-my-turn', qs.stringify(reqBody))
        .then(resp => dispatch({
            type: IS_MY_TURN,
            payload: resp.data.message
        }))
        .catch(err => dispatch({
            type: ERROR,
            payload: err.response.data.message
        }));
}

export const clearErrorMessage = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR_MESSAGE
    });
}