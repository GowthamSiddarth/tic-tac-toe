import { CREATE_PLAYER, CREATE_GAME_ROOM } from "../actions/types";

const initState = {
    playerId: undefined,
    gameRoomId: undefined
};

export default function (state = initState, action) {
    switch (action.type) {
        case CREATE_PLAYER:
            return {
                ...state,
                playerId: action.payload
            };

        case CREATE_GAME_ROOM:
            return {
                ...state,
                gameRoomId: action.payload
            }

        default:
            return state;
    }
}