import React from 'react';
import styles from './App.css';
import sprout from '../assets/sprout.png';

const App = () => (
	<div className={styles.container}>
		<h1>Hello, sprouters!</h1>
		<a href="/about">
			<img src={sprout} alt="sprout" />
		</a>
	</div>
);

export default App;
