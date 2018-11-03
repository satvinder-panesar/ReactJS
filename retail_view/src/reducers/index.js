import { combineReducers } from 'redux';
import { retail_data } from './retailData.reducer';

const myReducers = combineReducers({
    retail_data
});

export default myReducers;