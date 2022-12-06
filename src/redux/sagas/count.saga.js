// The difference between takeEvery and takeLatest:
// https://redux-saga.js.org/docs/basics/UsingSagaHelpers/#:~:text=Unlike%20takeEvery%20%2C%20takeLatest%20allows%20only,task%20will%20be%20automatically%20cancelled.

import { put, takeLatest, delay } from "redux-saga/effects";

function* countSaga() {
  yield takeLatest("AUTO_CLICKER", intervalCount);
}

// saga that will utilize setInterval to add a count
// to the count reducer. The action payload will be
// the multiplier.
function* intervalCount(action) {
  // for now just add dispatch the multiplier to
  // "INCREMENT_COUNT" every one second.
  const multiplier = action.payload;
  console.log("Auto_Clicked");
  yield delay(2000);
  yield put({ type: "INCREMENT_COUNT", payload: multiplier });
  yield put({ type: "AUTO_CLICKER", payload: multiplier });
}

export default countSaga;
