import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("product", action.payload)
    // let response=yield createMultipartRecord("product",action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("product", action.payload)
    // let response=yield updateMultipartRecord("product",action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload:  action.payload })
}

export function* ProductSagas() {                       //watcher saga
    yield takeEvery(CREATE_PRODUCT, createSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)
}