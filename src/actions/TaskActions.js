import { TaskConstants } from '../constants';
import { TaskService } from '../services';
import { AlertActions } from './AlertActions';
// import { history } from '../helpers';

export const TaskActions = {
    index,
    create,
    update,
    remove,
};

function index() {
    return dispatch => {
        // dispatch(request());
        return TaskService.index()
            .then(
                tasks => {
                    if (tasks.error){
                        let error = tasks;
                        dispatch(failure(error));
                        dispatch(AlertActions.error(error));
                    }else{
                        dispatch(success(tasks));
                    }

                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error({
                        message : 'Something wrong!',
                    }));
                }
            );
    };
    function success(tasks) { return { type: TaskConstants.INDEX_SUCCESS, tasks } }
    function failure(error) { return { type: TaskConstants.INDEX_FAILURE, error } }
}


function create(task) {
    return dispatch => {
        return TaskService.create(task)
            .then(
                task => {
                    if (task.errors){
                        let error = {
                            message : task.errors.description[0],
                        };
                        dispatch(failure(error));
                        dispatch(AlertActions.error(error));
                    }else {
                        dispatch(success(task));
                        dispatch(AlertActions.success({
                            message : 'Task created success',
                        }));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error({
                        message : 'Something wrong!',
                    }));
                }
            );
    };

    function success(task) { return { type: TaskConstants.CREATED_SUCCESS, task } }
    function failure(error) { return { type: TaskConstants.CREATED_FAILURE, error } }
}


function remove(task) {
    return dispatch => {
        return TaskService.remove(task)
            .then(
                task => {
                    if (task.errors){
                        let error = {
                            message : task.errors.description[0],
                        };
                        dispatch(failure(error));
                        dispatch(AlertActions.error(error));
                    }else {
                        dispatch(success(task));
                        dispatch(AlertActions.success({
                            message : 'Task deleted success',
                        }));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error({
                        message : 'Something wrong!',
                    }));
                }
            );
    };

    function success(task) { return { type: TaskConstants.DELETED_SUCCESS, task } }
    function failure(error) { return { type: TaskConstants.DELETED_FAILURE, error } }
}


function update(id, values) {
    return dispatch => {
        return TaskService.update(id, values)
            .then(
                task => {
                    if (task.errors){
                        let error = {
                            message : task.errors.description[0],
                        };
                        dispatch(failure(error));
                        dispatch(AlertActions.error(error));
                    }else {
                        dispatch(success(task));
                        dispatch(AlertActions.success({
                            message : 'Task updated success',
                        }));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(AlertActions.error({
                        message : 'Something wrong!',
                    }));
                }
            );
    };

    function success(task) { return { type: TaskConstants.UPDATED_SUCCESS, task } }
    function failure(error) { return { type: TaskConstants.UPDATED_FAILURE, error } }
}

