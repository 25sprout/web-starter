import React from 'react';
import { Link } from 'react-router';

const Counter = ({ count, increment, decrement }) => (
	<div>
		<div>{count.toString()}</div>
		<button onClick={decrement}>-</button>
		<button onClick={increment}>+</button>
		<Link to="/">Home</Link>
	</div>
);

export default Counter;
