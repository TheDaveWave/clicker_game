// The difference between takeEvery and takeLatest:
// https://redux-saga.js.org/docs/basics/UsingSagaHelpers/#:~:text=Unlike%20takeEvery%20%2C%20takeLatest%20allows%20only,task%20will%20be%20automatically%20cancelled.

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* countSaga() {
    yield takeLatest("Auto_Clicker", intervalCount);
}

// saga that will utilize setInterval to add a count
// to the count reducer. The action payload will be
// the multiplier.
function* intervalCount(action) {
    try {
        // for now just add dispatch the multiplier to 
        // "Increment_Count" every one second.
        const interval = yield call(
            setInterval(() => {
                console.log("Auto Clicked");
            }, 1000)
        )
    } catch (err) {
        console.log('Error in intervalCount', err);
    }
}


export default countSaga;