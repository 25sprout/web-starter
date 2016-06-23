import React from 'react';
import styles from './App.css';
import sprout from './assets/sprout.png';

const App = () => (
	<div>
		<h1 className={styles.app}>Hello, world!</h1>
		<img src={sprout} alt="sprout" />
	</div>
);

export default App;
