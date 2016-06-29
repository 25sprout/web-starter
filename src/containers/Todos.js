import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { createSelector } from 'reselect';

const todosSelector = state => state.todos.todos;
const filterSelector = state => state.todos.filter;
const getFilteredTodos = createSelector(
	[todosSelector, filterSelector],
	(todos, filter) => {
		switch (filter) {
		case 'all':
			return todos;
		case 'pending':
			return todos.filterNot(todo => todo.get('isChecked'));
		case 'done':
			return todos.filter(todo => todo.get('isChecked'));
		default:
			return todos;
		}
	}
);

const mapStateToProps = state => ({
	todos: getFilteredTodos(state),
});

export default connect(mapStateToProps)(Todos);
