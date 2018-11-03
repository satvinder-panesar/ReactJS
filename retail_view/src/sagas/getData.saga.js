import { call, put, takeLatest } from "redux-saga/effects";

function readFile(){
	console.log("read file operation")
	return "retail data it is"
}

export function* getDataFromFile() {
    console.log("saga reached");
    const data = yield call(readFile);
    console.log(data);
    yield put({type:"RETAIL_DATA_SUCCESS",retail_data:data});
}

export const getRetailData = [
    takeLatest("RETAIL_DATA_REQUEST", getDataFromFile)
]