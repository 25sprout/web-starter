import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Counter.css';

const Counter = ({ count, increment, decrement }) => (
	<div className={styles.counter}>
		<div className={styles.number}>{count}</div>
		<button onClick={decrement}>-</button>
		<button onClick={increment}>+</button>
		<Link to="/">Home</Link>
	</div>
);

Counter.propsTypes = {
	count: PropTypes.number.isRequired,
};

export default Counter;
