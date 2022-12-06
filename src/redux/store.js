import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import logger from "redux-logger";

import rootReducer from "./reducers/root.reducer";
import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware ,logger)
);

sagaMiddleware.run(rootSaga);

export default store;