import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("wishlist", action.payload)
    // let response=yield createMultipartRecord("wishlist",action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("wishlist", action.payload)
    // let response=yield updateMultipartRecord("wishlist",action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload:  action.payload })
}

export function* WishlistSagas() {                       //watcher saga
    yield takeEvery(CREATE_WISHLIST, createSaga)
    yield takeEvery(GET_WISHLIST, getSaga)
    yield takeEvery(UPDATE_WISHLIST, updateSaga)
    yield takeEvery(DELETE_WISHLIST, deleteSaga)
}