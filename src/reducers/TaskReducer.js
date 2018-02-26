import {TaskConstants} from '../constants';

const initialState = {
    all : []
};

export function tasks(state = initialState, action) {
    switch (action.type) {
        case TaskConstants.INDEX_REQUEST:
            return {};
        case TaskConstants.INDEX_SUCCESS:
            return {
                ...state,
                all: action.tasks
            };
        case TaskConstants.INDEX_FAILURE:
            return {};
        case TaskConstants.CREATE_REQUEST:
            return state;
        case TaskConstants.CREATED_SUCCESS:
            state.all.push(action.task);
            return {
                ...state,
                all: state.all,
            };
        case TaskConstants.CREATED_FAILURE:
            return state;
        default:
            return state
    }
}