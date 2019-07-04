import {VISIBILITY_FACTOR} from './constants';
export const getCListState = store => {return store.checkList};
export const getCheckList = store => {
    return getCListState(store) ? getCListState(store).allIds: [];
};
export const getCheckListById = (store, id) => {
    return getCListState(store) ? {...getCListState(store).byIds[id], id}: {};
}
export const getCheckListArray = store => {
    getCheckList(store).map(id => getCheckListById(id));
    return store.checkList.byIds;
};

export const getCheckListByVisibilityFactor = (store, visibility_factor) => {
    const allCheckList = getCheckListArray(store);
    console.log(allCheckList);
    switch(visibility_factor)
    {
        case VISIBILITY_FACTOR.COMPLETED :
            return allCheckList.filter(cl=> cl.completed);
        case VISIBILITY_FACTOR.INCOMPLETE:
            return allCheckList.filter(cl => !cl.completed);
        case VISIBILITY_FACTOR.ALL:
        default:
            return allCheckList

    }
};