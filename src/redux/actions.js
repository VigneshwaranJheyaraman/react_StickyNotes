import {addCheckList, toogle_checkList, setFilter} from './actionTypes';
export const addCList = (content, counterValue) => ({
    type: addCheckList,
    payload : {
        id: ++counterValue,
        content
    }
});

export const toggleCList = idd => ({
    type: toogle_checkList,
    payload: { idd }
});

export const setCListFilter = filter => ({
    type:setFilter,
    payload: { filter }
});