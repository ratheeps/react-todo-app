import {combineReducers} from 'redux';

import {authentication} from './AuthenticationReducer';
import {tasks} from './TaskReducer';
import {alert} from './AlertReducer';

const rootReducer = combineReducers({
    authentication,
    tasks,
    alert
});

export default rootReducer;