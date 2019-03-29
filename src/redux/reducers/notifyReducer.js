import {
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
	SET_ANIMATION
} from '../actions/types';

const initialState = {
	shown: false,
	animation: false,
	message: 'Вы успешно зарегистрировались!'
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_NOTIFICATION:
			return {
				...state,
				shown: true,
				message: action.payload
			};
		case HIDE_NOTIFICATION:
			return {
				...state,
				shown: false,
				message: ''
			};
		case SET_ANIMATION:
			return {
				...state,
				animation: action.payload
			};
		default:
			return state;
	}
}
