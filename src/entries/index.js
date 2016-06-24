import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../components/App';
import '../style.global.css';

render(
	<AppContainer component={App} />,
	document.getElementById('root')
);

/* eslint-disable global-require */
if (module.hot) {
	module.hot.accept('../components/App', () => {
		render(
			<AppContainer component={require('../components/App').default} />,
			document.getElementById('root')
		);
	});
}
/* eslint-disable */
