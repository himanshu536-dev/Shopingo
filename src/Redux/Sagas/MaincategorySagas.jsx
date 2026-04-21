import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("maincategory", action.payload)
    // let response=yield createMultipartRecord("maincategory",action.payload)
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}
function* getSaga() {                                                     //executer,worker saga
    let response = yield getRecord("maincategory")
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}
function* updateSaga(action) {                                            //executer,worker saga
    yield updateRecord("maincategory", action.payload)
    // let response=yield updateMultipartRecord("maincategory",action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {                                            //executer,worker saga
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export function* MaincategorySagas() {                       //watcher saga
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}