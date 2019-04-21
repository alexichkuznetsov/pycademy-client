import {
	GET_PROFILE_START,
	GET_PROFILE_FINISH,
	GET_PROFILE_ERROR
} from '../actions/types';

const initialState = {
	profile: null,
	loading: false,
	error: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE_START:
			return {
				...state,
				loading: true
			};
		case GET_PROFILE_FINISH:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case GET_PROFILE_ERROR:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};
