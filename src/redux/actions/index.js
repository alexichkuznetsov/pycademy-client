import {
	LOGIN_USER,
	LOGOUT_USER,
	SET_USER,
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
	SET_ANIMATION
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

	setTimeout(() => dispatch(setAnimation(false)), 500);
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
