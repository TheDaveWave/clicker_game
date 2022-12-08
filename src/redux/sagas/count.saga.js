// The difference between takeEvery and takeLatest:
// https://redux-saga.js.org/docs/basics/UsingSagaHelpers/#:~:text=Unlike%20takeEvery%20%2C%20takeLatest%20allows%20only,task%20will%20be%20automatically%20cancelled.

import { put, takeEvery, select } from "redux-saga/effects";

function* countSaga() {
  yield takeEvery("CHECK_CLICKS", checkClicks);
  yield takeEvery("ADD_CLICK", addClick);
}

// used to check how many clicks there are and
// updated the store accordingly.
function* checkClicks() {
  // access the current state of the store by using the select effect.
  const state = yield select();
  const clicks = state.countReducer.clicks;
  const pointMultiplier = state.upgrades.pointMultiplier.value;
  // check if clicks * multiplier are greater than or equal to ten
  // if so reset clicks and add a point.
  if (clicks >= 10) {
    /* calculate how many points would be made every 10 clicks with the click multiplier.
    one point per 10 clicks, but click multiplier may be 32 clicks per click.
    one issue is the remainder. This does not grab the remainder and store it, 
    and then add it until it equals 10 to add a point. */
    // console.log("clicks:", clicks);
    const newPoints = Math.floor(clicks / 10) * pointMultiplier;
    // console.log("newPoints:", newPoints);
    // update the pointMultiplier to be the newPoints calculation times the pointMultiplier.
    yield put({ type: "RESET_CLICKS" });
    yield put({ type: "INCREMENT_POINTS", payload: newPoints });
  }
}

// adds a click, count, and then dispatches checkClicks.
function* addClick() {
  const state = yield select();
  const multiplier = state.upgrades.clickMultiplier.value;
  yield put({ type: "INCREMENT_CLICKS", payload: multiplier });
  yield put({ type: "INCREMENT_COUNT", payload: multiplier });
  yield put({ type: "CHECK_CLICKS", payload: multiplier });
}

export default countSaga;
