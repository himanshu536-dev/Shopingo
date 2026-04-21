import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("cart", action.payload)
    // let response=yield createMultipartRecord("cart",action.payload)
    yield put({ type: CREATE_CART_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("cart")
    yield put({ type: GET_CART_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("cart", action.payload)
    // let response=yield updateMultipartRecord("cart",action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload:  action.payload })
}

export function* CartSagas() {                       //watcher saga
    yield takeEvery(CREATE_CART, createSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)
}