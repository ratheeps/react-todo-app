import { TaskConstants } from '../constants';
import { TaskService } from '../services';
import { AlertActions } from './AlertActions';
import { history } from '../helpers';

export const TaskActions = {
    index,
    // create,
    // update,
    // delete,
};

function index() {
    return dispatch => {
        dispatch(request());
        TaskService.index()
            .then(
                tasks => {
                    dispatch(success(tasks));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error(error));
                }
            );
    };

    function request(tasks) { return { type: TaskConstants.INDEX_REQUEST, tasks } }
    function success(tasks) { return { type: TaskConstants.INDEX_SUCCESS, tasks } }
    function failure(error) { return { type: TaskConstants.INDEX_FAILURE, error } }
}
