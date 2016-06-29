import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Todos = ({ todos }) => (
	<div>
		<ul>
			{todos.map(todo => (
				<li key={todo.id}>{todo.text}</li>
			))}
		</ul>
		<Link to="/">Home</Link>
	</div>
);

Todos.propsTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Todos;
