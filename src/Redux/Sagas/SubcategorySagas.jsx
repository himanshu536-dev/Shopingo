import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("subcategory", action.payload)
    // let response=yield createMultipartRecord("subcategory",action.payload)
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
   yield updateRecord("subcategory", action.payload)
    // let response=yield updateMultipartRecord("subcategory",action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload:action.payload  })
}
function* deleteSaga(action) {                                             //executer,worker saga
 yield deleteRecord("subcategory", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload:action.payload })
}

export function* SubcategorySagas() {                       //watcher saga
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)
}