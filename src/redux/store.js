import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

const initialState = {};

const store = createStore(
    initialState,
    compose(
        applyMiddleware(thunk)
    )
);

export default store;