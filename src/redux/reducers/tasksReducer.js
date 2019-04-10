import {
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
} from '../actions/types';

const initialState = {
	current: null,
	tasks: [],
	loading: false,
	getTaskError: '',
	addTaskErrors: {},
	deleteTask: {
		loading: false,
		status: '',
		error: false
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TASKS_START:
			return {
				...state,
				loading: true
			};
		case GET_TASKS_FINISH:
			return {
				...state,
				loading: false,
				tasks: action.payload
			};
		case GET_TASKS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case ADD_TASK_START:
			return {
				...state,
				loading: true
			};
		case ADD_TASK_FINISH:
			return {
				...state,
				loading: false,
				tasks: [action.payload, ...state.tasks]
			};
		case ADD_TASK_ERROR:
			return {
				...state,
				loading: false,
				addTaskErrors: action.payload
			};
		case RESET_TASK_ERRORS:
			return {
				...state,
				addTaskErrors: {}
			};
		case DELETE_TASK_START:
			return {
				...state,
				deleteTask: {
					loading: true,
					status: null,
					error: false
				}
			};
		case DELETE_TASK_FINISH:
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== action.payload),
				deleteTask: {
					loading: false,
					status: 'Задание удалено',
					error: false
				}
			};
		case DELETE_TASK_ERROR:
			return {
				...state,
				deleteTask: {
					loading: false,
					status: 'Произошла ошибка во время удаления задания',
					error: true
				}
			};
		default:
			return state;
	}
}
