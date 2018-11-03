import { all } from "redux-saga/effects";
import { getRetailData } from './getData.saga';

export default function* mySaga() {
  yield all([
    ...getRetailData
  ]);
}