import {
	LOGIN_USER,
	LOGOUT_USER,
	SET_USER,
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
	SET_ANIMATION,
	GET_TASKS_START,
	GET_TASKS_FINISH,
	GET_TASKS_ERROR,
	ADD_TASK_START,
	ADD_TASK_FINISH,
	ADD_TASK_ERROR,
	RESET_TASK_ERRORS,
	DELETE_TASK_START,
	DELETE_TASK_FINISH,
	DELETE_TASK_ERROR
} from './types';
import axios from 'axios';

export const loginUser = () => dispatch => {
	axios
		.get('/api/auth/current')
		.then(res => {
			const { name, email, status, completedTasks } = res.data;

			dispatch({
				type: LOGIN_USER,
				payload: {
					authenticated: true,
					user: { name, email, status, completedTasks }
				}
			});
		})
		.catch(err => {
			if (err.response.status === 401) {
				dispatch({
					type: LOGOUT_USER
				});
			}
		});
};

export const logoutUser = () => dispatch => {
	axios.post('/api/auth/logout').then(() =>
		dispatch({
			type: LOGOUT_USER
		})
	);
};

export const setUser = user => ({
	type: SET_USER,
	payload: {
		authenticated: true,
		user
	}
});

// Notifications actions
export const showNotification = message => dispatch => {
	dispatch({
		type: SHOW_NOTIFICATION,
		payload: message
	});

	dispatch(setAnimation('sliding-in'));

	setTimeout(() => {
		dispatch(setAnimation(false));

		setTimeout(() => dispatch(hideNotification()), 3000);
	}, 500);
};

export const hideNotification = () => dispatch => {
	dispatch(setAnimation('sliding-out'));

	setTimeout(
		() =>
			dispatch({
				type: HIDE_NOTIFICATION
			}),
		500
	);

	setTimeout(() => dispatch(setAnimation(false)), 500);
};

export const setAnimation = animation => ({
	type: SET_ANIMATION,
	payload: animation
});

// Tasks actions
export const getTasks = () => dispatch => {
	dispatch({
		type: GET_TASKS_START
	});

	axios
		.get('/api/tasks')
		.then(res =>
			dispatch({
				type: GET_TASKS_FINISH,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_TASKS_ERROR,
				payload: err.response.data
			})
		);
};

export const addTask = (task, historyPush) => dispatch => {
	dispatch({
		type: ADD_TASK_START
	});

	axios
		.post('/api/tasks/', task)
		.then(res => {
			dispatch({
				type: ADD_TASK_FINISH,
				payload: res.data
			});

			historyPush('/tasks');
		})
		.catch(err => {
			dispatch({
				type: ADD_TASK_ERROR,
				payload: err.response.data
			});
		});
};

export const resetTaskErrors = () => ({
	type: RESET_TASK_ERRORS
});

export const deleteTask = id => dispatch => {
	dispatch({
		type: DELETE_TASK_START
	});

	axios
		.delete(`/api/tasks/${id}`)
		.then(res => {
			dispatch({
				type: DELETE_TASK_FINISH,
				payload: id
			});
		})
		.catch(err =>
			dispatch({
				type: DELETE_TASK_ERROR,
				payload: err.response
			})
		);
};
