import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("setting", action.payload)
    // let response=yield createMultipartRecord("setting",action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("setting")
    yield put({ type: GET_SETTING_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("setting", action.payload)
    // let response=yield updateMultipartRecord("setting",action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("setting", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload:  action.payload })
}

export function* SettingSagas() {                       //watcher saga
    yield takeEvery(CREATE_SETTING, createSaga)
    yield takeEvery(GET_SETTING, getSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
    yield takeEvery(DELETE_SETTING, deleteSaga)
}