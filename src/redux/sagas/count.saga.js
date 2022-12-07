// The difference between takeEvery and takeLatest:
// https://redux-saga.js.org/docs/basics/UsingSagaHelpers/#:~:text=Unlike%20takeEvery%20%2C%20takeLatest%20allows%20only,task%20will%20be%20automatically%20cancelled.

import { put, takeEvery, select } from "redux-saga/effects";

function* countSaga() {
  yield takeEvery("CHECK_CLICKS", checkClicks);
  yield takeEvery("ADD_CLICK", addClick);
}

// used to check how many clicks there are and
// updated the store accordingly.
function* checkClicks(action) {
  // access the current state of the store by using the select effect.
  const state = yield select();
  const clicks = state.countReducer.clicks;
  const multiplier = action.payload;
  // check if clicks * multiplier are greater than or equal to ten
  // if so reset clicks and add a point.
  if (clicks * multiplier >= 10) {
    yield put({ type: "RESET_CLICKS" });
    yield put({ type: "INCREMENT_POINTS" });
  }
}

// adds a click, count, and then dispatches checkClicks.
function* addClick(action) {
  const multiplier = action.payload;
  yield put({ type: "INCREMENT_CLICKS", payload: multiplier });
  yield put({ type: "INCREMENT_COUNT", payload: multiplier });
  yield put({ type: "CHECK_CLICKS", payload: multiplier });
}

export default countSaga;
