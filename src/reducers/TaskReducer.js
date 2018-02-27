import {TaskConstants} from '../constants';

const initialState = {
    all : []
};

export function tasks(state = initialState, action) {
    switch (action.type) {
        case TaskConstants.INDEX_REQUEST:
            return state;
        case TaskConstants.INDEX_SUCCESS:
            return {
                ...state,
                all: action.tasks
            };
        case TaskConstants.INDEX_FAILURE:
            return state;
        case TaskConstants.CREATE_REQUEST:
            return state;
        case TaskConstants.CREATED_SUCCESS:
            state.all.push(action.task);
            return {
                ...state,
                all: state.all,
            };
        case TaskConstants.DELETED_FAILURE:
            return state;
        case TaskConstants.DELETE_REQUEST:
            return state;
        case TaskConstants.DELETED_SUCCESS:
            let taskIndex = state.all.findIndex(task => task.id === action.task.id);
            state.all.splice(taskIndex, 1);
            return {
                ...state,
                all: state.all,
            };
        case TaskConstants.UPDATED_FAILURE:
            return state;
        case TaskConstants.UPDATE_REQUEST:
            return state;
        case TaskConstants.UPDATED_SUCCESS:
            let updatedTaskIndex = state.all.findIndex(task => task.id === action.task.id);
            state.all[updatedTaskIndex] = action.task;
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