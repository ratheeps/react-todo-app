import { TaskConstants } from '../constants';
import { TaskService } from '../services';
import { AlertActions } from './AlertActions';
import { history } from '../helpers';

export const TaskActions = {
    index,
    create,
    // update,
    // delete,
};

function index() {
    return dispatch => {
        // dispatch(request());
        TaskService.index()
            .then(
                tasks => {
                    dispatch(success(tasks));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error(error));
                }
            );
    };
    function success(tasks) { return { type: TaskConstants.INDEX_SUCCESS, tasks } }
    function failure(error) { return { type: TaskConstants.INDEX_FAILURE, error } }
}


function create(task) {
    return dispatch => {
        TaskService.create(task)
            .then(
                task => {
                    dispatch(success(task));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error(error));
                }
            );
    };

    function success(tasks) { return { type: TaskConstants.CREATED_SUCCESS, tasks } }
    function failure(error) { return { type: TaskConstants.CREATED_FAILURE, error } }
}
