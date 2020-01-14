import { CREATE_PLAYER, CREATE_GAME_ROOM, START_NEW_GAME, JOIN_GAME_ROOM, MAKE_A_MOVE, IS_MY_TURN } from "../actions/types";

const initState = {
    playerId: undefined,
    gameRoomId: undefined,
    gameId: undefined,
    playerSymbol: undefined,
    myTurn: undefined,
    lastMoveSymbol: undefined,
    lastMoveRow: undefined,
    lastMoveCol: undefined,
    gameStatus: undefined,
    winner: undefined
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
                lastMoveRow: parseInt(action.payload.last_move_row),
                lastMoveCol: parseInt(action.payload.last_move_col),
                myTurn: 'true' === action.payload.my_turn,
                gameStatus: action.payload.game_status,
                winner: action.payload.winner
            };

        case MAKE_A_MOVE:
            return {
                ...state,
                myTurn: 'true' === action.payload.my_turn,
                gameStatus: action.payload.game_status,
                winner: action.payload.winner
            };

        default:
            return state;
    }
}