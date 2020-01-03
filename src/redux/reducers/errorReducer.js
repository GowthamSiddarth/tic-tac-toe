import { ERROR, CLEAR_ERROR_MESSAGE } from "../actions/types";

const initState = {
    errorMessage: undefined
};

export default function (state = initState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };

        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: undefined
            }

        default:
            return state;
    }
}