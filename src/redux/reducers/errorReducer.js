import { ERROR } from "../actions/types";

const initState = {
    msgFromServer: undefined
};

export default function (state = initState, action) {
    switch (action.type) {
        case ERROR:
            console.log(action.payload);
            return {
                ...state,
                msgFromServer: action.payload
            };

        default:
            return state;
    }
}