import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("testimonial", action.payload)
    // let response=yield createMultipartRecord("testimonial",action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
     yield updateRecord("testimonial", action.payload)
    // let response=yield updateMultipartRecord("testimonial",action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload})
}
function* deleteSaga(action) {                                             //executer,worker saga
   yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload:  action.payload })
}

export function* TestimonialSagas() {                       //watcher saga
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)
}