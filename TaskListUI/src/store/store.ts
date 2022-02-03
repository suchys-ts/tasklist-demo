import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';

//build midddleware
const sagaMiddleware = createSagaMiddleware();

//init store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//init sagas
sagaMiddleware.run(rootSaga);

export default store;