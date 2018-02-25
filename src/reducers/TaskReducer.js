import {TaskConstants} from '../constants';

const initialState = {};

export function tasks(state = initialState, action) {
    switch (action.type) {
        case TaskConstants.INDEX_REQUEST:
            return action.tasks;
        case TaskConstants.INDEX_SUCCESS:
            return action.tasks;
        case TaskConstants.INDEX_FAILURE:
            return {};
        default:
            return state
    }
}