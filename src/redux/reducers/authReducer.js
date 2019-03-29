import { LOGIN_USER, LOGOUT_USER, SET_USER } from '../actions/types';

const initialState = {
	authenticated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				authenticated: action.payload.authenticated,
				user: action.payload.user
			};
		case LOGOUT_USER:
			return {
				...state,
				authenticated: false,
				user: {}
			};
		case SET_USER:
			return {
				...state,
				authenticated: action.payload.authenticated,
				user: action.payload.user
			};
		default:
			return state;
	}
}
