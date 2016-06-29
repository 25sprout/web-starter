import { handleActions } from 'redux-actions';

export default handleActions({
	LOAD_TODOS: (state, action) => ({
		...state,
		todos: action.payload,
	}),
}, {
	todos: [],
});
