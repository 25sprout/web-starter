import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Todo from '../containers/Todo';

const Todos = ({ todos }) => (
	<List>
		{todos.toArray().map(todo => (
			<Todo
				key={todo.get('id')}
				todoId={todo.get('id')}
				isChecked={todo.get('isChecked')}
				text={todo.get('text')}
			/>
		))}
	</List>
);

Todos.propsTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Todos;
