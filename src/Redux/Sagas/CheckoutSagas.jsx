import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("checkout", action.payload)
    // let response=yield createMultipartRecord("checkout",action.payload)
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("checkout", action.payload)
    // let response=yield updateMultipartRecord("checkout",action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload:  action.payload })
}

export function* CheckoutSagas() {                       //watcher saga
    yield takeEvery(CREATE_CHECKOUT, createSaga)
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)
}