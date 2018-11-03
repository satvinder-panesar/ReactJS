import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

function readFile(){
	console.log("read file operation")
	return axios.get('http://localhost:8088/getRetailData')
	.then((response)=>response.data[0])
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