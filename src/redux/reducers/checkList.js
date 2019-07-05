import {addCheckList, toogle_checkList} from '../actionTypes';
const initialState = {
    allIds: [],
    byIds : JSON.parse(localStorage.getItem("checkList"))
};
export default function(state = initialState, action)
{
    switch(action.type)
    {
        case addCheckList:
            var { id, content } = action.payload;
            var st = {...state, 
                allIds:[...state.allIds, id],
                byIds:{
                    ...state.byIds,
                    [id] : {
                        content, 
                        completed:false
                    }
                }
            };
            return st;
        case toogle_checkList:
            var { idd }  = action.payload;
            var tSt = Object.assign({}, {
                ...state,
                byIds : {
                    ...state.byIds,
                    [idd]:{
                        ...state.byIds[idd],
                        completed: !state.byIds[idd].completed
                    }
                }});
            return tSt;
        default:
            return state;
    }
};