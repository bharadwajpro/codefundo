import { applyMiddleware, createStore } from "redux"

import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import {reducer} from "./reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default function configureStore() {
    const store = createStore(reducer, middleware)

    if(module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}

// export default createStore(reducer, middleware)
