import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
	<MuiThemeProvider>
		<div styleName="container">
			{children}
		</div>
	</MuiThemeProvider>
);

export default CSSModules(App, styles);
