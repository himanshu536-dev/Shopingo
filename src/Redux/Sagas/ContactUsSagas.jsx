import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("contactus", action.payload)
    // let response=yield createMultipartRecord("contactus",action.payload)
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACTUS_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("contactus", action.payload)
    // let response=yield updateMultipartRecord("contactus",action.payload)
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACTUS_RED, payload:  action.payload })
}

export function* ContactUsSagas() {                       //watcher saga
    yield takeEvery(CREATE_CONTACTUS, createSaga)
    yield takeEvery(GET_CONTACTUS, getSaga)
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)
}