import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
    authRequest,
    authSuccess,
    authFailure,
    verRequest,
    refFailure
} from "./actions";
import { fetchAuth, fetchVerifyToken, fetchRefreshToken } from "./api.js";
import { save } from "../../localStorage";

function* fetchNWatcher(action) {
    yield takeLatest(authRequest, authRequestFlow);
    yield takeLatest(verRequest, verRequestFlow);
}

export function* authRequestFlow(action) {
    try {
        const tokens = yield call(fetchAuth, action.payload);
        if (tokens) {
            yield call(save, "access", tokens.access);
            yield call(save, "refresh", tokens.refresh);
            yield put(authSuccess());
        }
    } catch (error) {
        yield put(authFailure(error.message));
    }
}

export function* verRequestFlow(action) {
    console.log("verification proccess");
    try {
        const verification = yield call(fetchVerifyToken);
        if (verification) {
            console.log("access is fresh");
            yield put(authSuccess());
        }
    } catch (error) {
        if (error.message === "Request failed with status code 401") {
            try {
                console.log("access is expired");
                const tokens = yield call(fetchRefreshToken);
                yield call(save, "access", tokens.access);
                yield put(authSuccess());
            } catch (error) {
                yield call(localStorage.removeItem("access"));
                yield call(localStorage.removeItem("refresh"));
                yield put(refFilure());
            }
        }
    }
}

export default function*() {
    yield fork(fetchNWatcher);
}
