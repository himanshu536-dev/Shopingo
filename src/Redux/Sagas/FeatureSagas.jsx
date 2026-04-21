import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constants";
import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index";

function* createSaga(action) {                                             //executer,worker saga
    let response = yield createRecord("feature", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}
function* getSaga() {                                             //executer,worker saga
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}
function* updateSaga(action) {                                             //executer,worker saga
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })
}
function* deleteSaga(action) {                                             //executer,worker saga
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export function* FeatureSagas() {                       //watcher saga
    yield takeEvery(CREATE_FEATURE, createSaga)
    yield takeEvery(GET_FEATURE, getSaga)
    yield takeEvery(UPDATE_FEATURE, updateSaga)
    yield takeEvery(DELETE_FEATURE, deleteSaga)
}