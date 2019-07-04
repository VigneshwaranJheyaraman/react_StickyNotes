import {setFilter} from '../actionTypes';
import { VISIBILITY_FACTOR } from '../constants';
const initialState = VISIBILITY_FACTOR.ALL;
const visibilityFilter = (state= initialState, action) => {
    switch(action.type)
    {
        case setFilter:
            return action.payload.filter;
        default:
            return state;
    }
};
export default visibilityFilter;