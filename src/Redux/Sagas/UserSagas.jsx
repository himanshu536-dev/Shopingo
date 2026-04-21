import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("user", action.payload)
    // let response=yield createMultipartRecord("user",action.payload)
    yield put({ type: CREATE_USER_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("user")
    yield put({ type: GET_USER_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("user", action.payload)
    // let response=yield updateMultipartRecord("user",action.payload)
    yield put({ type: UPDATE_USER_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_RED, payload:  action.payload })
}

export function* UserSagas() {                       //watcher saga
    yield takeEvery(CREATE_USER, createSaga)
    yield takeEvery(GET_USER, getSaga)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(DELETE_USER, deleteSaga)
}