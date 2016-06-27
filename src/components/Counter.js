import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Counter = ({ count, increment, decrement }) => (
	<div>
		<div>{count}</div>
		<button onClick={decrement}>-</button>
		<button onClick={increment}>+</button>
		<Link to="/">Home</Link>
	</div>
);

Counter.propsTypes = {
	count: PropTypes.number.isRequired,
};

export default Counter;
