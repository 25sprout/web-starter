import { handleActions } from 'redux-actions';
import { OrderedMap } from 'immutable';

export default handleActions({
	LOAD_TODOS: (state, action) => ({
		...state,
		todos: action.payload,
	}),

	CHECK_TODO: (state, action) => ({
		...state,
		todos: state.todos.update(
			action.payload.id,
			todo => todo.set('isChecked', action.payload.isChecked)
		),
	}),

	ADD_TODO: (state, action) => ({
		...state,
		todos: state.todos.set(action.payload.get('id'), action.payload),
	}),

	SET_FILTER: (state, action) => ({
		...state,
		filter: action.payload,
	}),

	DELETE_TODO: (state, action) => ({
		...state,
		todos: state.todos.delete(action.payload),
	}),
}, {
	filter: 'all',
	todos: OrderedMap(),
});
