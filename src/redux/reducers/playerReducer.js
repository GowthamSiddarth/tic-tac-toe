import { CREATE_PLAYER, CREATE_GAME_ROOM, START_NEW_GAME, JOIN_GAME_ROOM, MAKE_A_MOVE, IS_MY_TURN, QUIT_GAME } from "../actions/types";
import update from "immutability-helper";

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
    winner: undefined,
    grid: Array(3).fill(undefined).map(() => Array(3).fill(undefined))
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
            let payload = action.payload;
            let newGrid = state.grid;
            if (undefined !== payload.last_move_row && undefined !== payload.last_move_col && payload.last_move_symbol !== state.playerSymbol) {
                newGrid = update(state.grid, {
                    [payload.last_move_row]: {
                        [payload.last_move_col]: {
                            $set: payload.last_move_symbol
                        }
                    }
                });
            }

            let lastMoveSymbol = state.lastMoveSymbol;
            if ("last_move_symbol" in payload) {
                lastMoveSymbol = payload.last_move_symbol;
            }

            let lastMoveRow = state.lastMoveRow;
            if ("last_move_row" in payload) {
                lastMoveRow = parseInt(payload.last_move_row);
            }

            let lastMoveCol = state.lastMoveCol;
            if ("last_move_col" in payload) {
                lastMoveCol = parseInt(payload.last_move_col);
            }

            return {
                ...state,
                lastMoveSymbol,
                lastMoveRow,
                lastMoveCol,
                myTurn: 'true' === action.payload.my_turn,
                gameStatus: action.payload.game_status,
                winner: action.payload.winner,
                grid: newGrid
            };

        case MAKE_A_MOVE:
            return {
                ...state,
                myTurn: 'true' === action.payload.my_turn,
                gameStatus: action.payload.game_status,
                winner: action.payload.winner,
                grid: update(state.grid, {
                    [action.coordinates.row]: {
                        [action.coordinates.col]: {
                            $set: state.playerSymbol
                        }
                    }
                })
            };

        case QUIT_GAME:
        default:
            return state;
    }
}