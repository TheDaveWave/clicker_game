import { all } from "redux-saga/effects";
import countSaga from "./count.saga";

function* rootSaga() {
    yield all([
        countSaga()
    ]);
}

export default rootSaga;