import { createAction } from 'redux-actions';

const BASE_URL = 'http://localhost:8001';

export const loadTodos = createAction('LOAD_TODOS', () => (
	fetch(`${BASE_URL}/todos`)
		.then(response => response.json())
));
