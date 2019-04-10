import { combineReducers } from 'redux';

import auth from './authReducer';
import notify from './notifyReducer';
import tasks from './tasksReducer';

export default combineReducers({ auth, notify, tasks });
