import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";
import myReducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    myReducers,//reducers
    applyMiddleware(sagaMiddleware)
);

// run saga
sagaMiddleware.run(mySaga);

export default store;