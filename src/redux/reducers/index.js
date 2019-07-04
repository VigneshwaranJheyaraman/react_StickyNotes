import {combineReducers} from 'redux';
import checkList from './checkList';
import visibilityFilter from './visibilityFactor';
export default combineReducers({checkList, visibilityFilter});