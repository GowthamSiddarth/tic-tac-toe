import { ERROR } from "../actions/types";

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

        default:
            return state;
    }
}