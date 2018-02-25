import {combineReducers} from 'redux';

import {authentication} from './AuthenticationReducer';
import {tasks} from './TaskReducer';

const rootReducer = combineReducers({
    authentication,
    tasks,
});

export default rootReducer;