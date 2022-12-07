import { all } from "redux-saga/effects";
import countSaga from "./count.saga";
import upgrades from "./upgrade.saga";

function* rootSaga() {
    yield all([
        countSaga(),
        upgrades(),
    ]);
}

export default rootSaga;