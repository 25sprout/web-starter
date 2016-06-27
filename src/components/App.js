import React from 'react';
import styles from './App.css';

const App = ({ children }) => (
	<div className={styles.container}>
		{children}
	</div>
);

export default App;
