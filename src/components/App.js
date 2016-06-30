import React from 'react';
import styles from './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
	<MuiThemeProvider>
		<div className={styles.container}>
			{children}
		</div>
	</MuiThemeProvider>
);

export default App;
