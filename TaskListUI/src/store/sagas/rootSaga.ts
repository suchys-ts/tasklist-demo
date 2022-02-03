import { all, fork} from "redux-saga/effects";
import {todosSaga} from "./todosSaga";

//root saga, register all (future) sagas here
export function* rootSaga() {
    yield all([fork(todosSaga)]);
}