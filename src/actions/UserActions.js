import { UserConstants } from '../constants';
import { UserService } from '../services';
import { AlertActions } from './AlertActions';
import {history} from "../helpers";

export const UserActions = {
    login,
    logout,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        return UserService.login(username, password)
            .then(
                user => {
                    if (user.message || user.error){
                        let error = user;
                        dispatch(failure(error));
                        dispatch(AlertActions.error(error));
                    }else{
                        dispatch(success(user));
                        dispatch(AlertActions.success({
                            message : 'Login Success',
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

    function request(user) { return { type: UserConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: UserConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: UserConstants.LOGIN_FAILURE, error } }
}

function logout() {
    UserService.logout();
    history.push('/');
    return { type: UserConstants.LOGOUT };
}