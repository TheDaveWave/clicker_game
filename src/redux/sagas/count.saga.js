// The difference between takeEvery and takeLatest:
// https://redux-saga.js.org/docs/basics/UsingSagaHelpers/#:~:text=Unlike%20takeEvery%20%2C%20takeLatest%20allows%20only,task%20will%20be%20automatically%20cancelled.

import { put, takeLatest, takeEvery, delay, select } from "redux-saga/effects";

function* countSaga() {
  yield takeLatest("AUTO_CLICKER", autoClicker);
  yield takeEvery("CHECK_CLICKS", checkClicks);
  yield takeEvery("ADD_CLICK", addClick);
}

// saga that will utilize setInterval to add a count
// to the count reducer. The action payload will be
// the multiplier.
function* autoClicker(action) {
  const multiplier = action.payload;
  yield delay(2000);
  yield put({ type: "ADD_CLICK", payload: multiplier});
  yield put({ type: "AUTO_CLICKER", payload: action.payload });
}

function* checkClicks(action) {
  const state = yield select();
  const clicks = state.clickReducer;
  const multiplier = action.payload;
  if ((clicks * multiplier) >= 10) {
    console.log(true);
    yield put({ type: "RESET_CLICKS" });
    yield put({ type: "INCREMENT_POINTS" });
  }
}

function* addClick(action) {
    const multiplier = action.payload;
    yield put({ type: "INCREMENT_CLICKS", payload: multiplier });
    yield put({ type: "INCREMENT_COUNT", payload: multiplier });
    yield put({ type: "CHECK_CLICKS", payload: multiplier });
}

export default countSaga;
