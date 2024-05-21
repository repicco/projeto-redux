import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} from "./slice";

import axios from "axios";
// API Users: https://jsonplaceholder.typicode.com/users/

function* fetchUsers() {
  try {
    yield delay(2000);

    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/users/"
    );

    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    console.log(error);

    yield put(fetchUsersFailure(error.message));
  }
}

function* fetchUserById(action) {
  try {
    const { userId } = action.payload;

    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    yield put(fetchUserByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchUserByIdFailure(error.message));
  }
}

export default all([
  takeLatest("user/fetchUsers", fetchUsers),
  takeLatest("user/fetchUserById", fetchUserById),
]);
