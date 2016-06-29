import { createAction } from 'redux-actions';
import { Map, OrderedMap, fromJS } from 'immutable';
import { generate } from 'shortid';

const BASE_URL = 'http://localhost:8001';

export const loadTodos = createAction('LOAD_TODOS', () => (
	fetch(`${BASE_URL}/todos`)
		.then(response => response.json())
		.then(fromJS)
		.then(arr => arr.map(item => [item.get('id'), item]))
		.then(arr => OrderedMap(arr))
));

export const checkTodo = createAction('CHECK_TODO', (id, isChecked) => ({
	id, isChecked,
}));

export const addTodo = createAction('ADD_TODO', value => Map({
	id: generate(),
	text: value,
	isChecked: false,
}));

export const setFilter = createAction('SET_FILTER');
