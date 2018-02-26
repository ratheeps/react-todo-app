import {API_URL, CLIENT_ID, CLIENT_SECRET, GRAND_TYPE} from '../config';
// import {authHeader} from '../helpers';

export const TaskService = {
    index,
    create
};

let accessToken = localStorage.getItem('uid');
let authHeader = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
let taskUrl = API_URL + 'api/tasks';

function index() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader,
    };
    return fetch(taskUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

function create(task) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(task)
    };
    return fetch(taskUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}