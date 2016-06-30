import React, { PropTypes } from 'react';
import styles from './Counter.css';
import { Card } from 'material-ui/Card';
import BackToHome from './BackToHome';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentMinus from 'material-ui/svg-icons/content/remove';

const Counter = ({ count, increment, decrement }) => (
	<Card style={{ padding: '30px 40px' }}>
		<BackToHome />
		<div className={styles.number}>{count}</div>

		<FloatingActionButton onClick={decrement}>
			<ContentMinus />
		</FloatingActionButton>
		<FloatingActionButton onClick={increment}>
			<ContentAdd />
		</FloatingActionButton>
	</Card>
);

Counter.propsTypes = {
	count: PropTypes.number.isRequired,
};

export default Counter;
