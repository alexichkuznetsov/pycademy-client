import { combineReducers } from 'redux';

import auth from './authReducer';
import notify from './notifyReducer';
import tasks from './tasksReducer';
import user from './userReducer';

export default combineReducers({ auth, notify, tasks, user });
