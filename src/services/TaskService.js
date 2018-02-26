import {API_URL} from '../config';
import {authHeader} from '../helpers';

export const TaskService = {
    index,
};

function index() {
    let accessToken = localStorage.getItem('uid');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };

    let AppUrl = API_URL + 'api/tasks';
    return fetch(AppUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}