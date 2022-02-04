import {all, put, call, takeLatest} from "redux-saga/effects";
import {FETCH_TODOS, POST_TODO, UPDATE_TODO} from "../actions/Types";
import {putTodosAction} from "../actions/TodoActions";
import axios, {AxiosError, AxiosResponse} from "axios";
//TODO import AxiosInstance from "../../Axios";

const BASE_URL = "http://localhost:80/api/todos";


export const axiosCall = (method?:string, path?:string, data?:any):Promise<AxiosResponse|AxiosError> => {
    const url = path ? `${BASE_URL}${path}` : BASE_URL;
    if (method === 'post') {
        return axios.post(url, data)
            .then(response => response)
            .catch(error => error);
    }
    if (method === 'put') {
        return axios.put(url, data)
            .then(response => response)
            .catch(error => error);
    }
    return axios.get(url)
        .then(response => response)
        .catch(error => error);
};

/**
 * fetches all available todo's
 */
export function* fetchTodosSaga():any {
    const result = yield call<any>(axiosCall);
    //we got the data
    if (result.status === 200) {
        //put the data to store
        yield put(putTodosAction(result.data));
    } else {
        //todo - put the error to store, display toaster showing error (offering refresh etc.)
    }
}

/**
 * Waits for a post new action, updates server with a new todo item
 */
export function* postTodoSaga(action:any):any {
    const result = yield call<any>(axiosCall, 'post', undefined, action.payload);
    //the item was properly added
    if (result.status === 200) {
        /* FIXME in a real application, this is an inefficient way to update, the put can return updated object and only a single object in collection can be updated without additional call,
         */
        //re-fetch todo list
        yield call(fetchTodosSaga);
    } else {
        //todo - put the error to store, display toaster showing error (offering refresh etc.)
    }
}

/**
 * Waits for a update action, updates server with an updated state
 */
export function* updateTodoSaga(action:any):any {
    const id = action.payload.id;
    const state = action.payload.state;
    const result = yield call<any>(axiosCall, 'put', undefined, {id: id, completed: state});
    //the item was properly updated
    if (result.status === 200) {
        /* FIXME in a real application, this is an inefficient way to update, the put can return updated object and only a single object in collection can be updated without additional call,
         alternatively OK response can be used to toggle state on client. This is OK for a small collection, but for a large collection the performance would suffer.
         */
        //re-fetch todo list
        yield call(fetchTodosSaga);
    } else {
        //todo - put the error to store, display toaster showing error (offering refresh etc.)
    }
}

/**
 * Init all todo's sagas
 */
export function* todosSaga() {
    yield all([
        takeLatest(FETCH_TODOS, fetchTodosSaga),
        takeLatest(POST_TODO, postTodoSaga),
        takeLatest(UPDATE_TODO, updateTodoSaga)
        ]);
}