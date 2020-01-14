import { CREATE_PLAYER, CREATE_GAME_ROOM, START_NEW_GAME, JOIN_GAME_ROOM, MAKE_A_MOVE, IS_MY_TURN } from "../actions/types";

const initState = {
    playerId: undefined,
    gameRoomId: undefined,
    gameId: undefined,
    playerSymbol: undefined,
    myTurn: undefined,
    lastMoveSymbol: undefined,
    lastMoveRow: undefined,
    lastMoveCol: undefined
};

export default function (state = initState, action) {
    switch (action.type) {
        case CREATE_PLAYER:
            return {
                ...state,
                playerId: action.payload
            };

        case CREATE_GAME_ROOM:
        case JOIN_GAME_ROOM:
            return {
                ...state,
                gameRoomId: action.payload
            }

        case START_NEW_GAME:
            return {
                ...state,
                gameId: action.payload.game_id,
                playerSymbol: action.payload.player_symbol,
                myTurn: 'true' === action.payload.my_turn
            };

        case IS_MY_TURN:
            return {
                ...state,
                lastMoveSymbol: action.payload.last_move_symbol,
                lastMoveRow: action.payload.last_move_row,
                lastMoveCol: action.payload.last_move_col,
                myTurn: 'true' === action.payload.my_turn
            };

        case MAKE_A_MOVE:
            return {
                ...state,
                myTurn: 'true' === action.payload.my_turn
            };

        default:
            return state;
    }
}