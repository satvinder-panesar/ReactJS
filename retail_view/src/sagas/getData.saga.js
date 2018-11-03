import { call, put, takeLatest } from "redux-saga/effects";

function readFile(){
	console.log("read file operation")
	return "retail data"
}

export function* getDataFromFile() {
    console.log("saga reached");
    const data = yield call(callNewsApi);
    console.log(data);
}

export const getRetailData = [
    takeLatest("RETAIL_DATA_REQUEST", getDataFromFile);
]