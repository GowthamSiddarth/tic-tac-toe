import { CREATE_PLAYER, CREATE_GAME_ROOM, START_NEW_GAME } from "../actions/types";

const initState = {
    playerId: undefined,
    gameRoomId: undefined,
    gameId: undefined,
    playerSymbol: undefined
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

        case START_NEW_GAME:
            return {
                ...state,
                gameId: action.payload.game_id,
                playerSymbol: action.payload.player_symbol
            };

        default:
            return state;
    }
}