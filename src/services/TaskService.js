import {API_URL} from '../config';
import {authHeader} from '../helpers';

export const TaskService = {
    index,
};

function index() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader,
    };
    let AppUrl = API_URL + '/api/tasks';
    return fetch(AppUrl, requestOptions)
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
}