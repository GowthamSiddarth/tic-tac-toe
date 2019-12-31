import { CREATE_PLAYER } from "../actions/types";

const initState = {
    playerId: undefined
};

export default function (state = initState, action) {
    switch (action.type) {
        case CREATE_PLAYER:
            return {
                ...state,
                playerId: action.payload
            };

        default:
            return state;
    }
}