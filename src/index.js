import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createReducer from './reducers';
import Routes from './routes';
import { install } from 'offline-plugin/runtime';
import 'sanitize.css/sanitize.css';
import './style.global.css';

const store = createStore(
	createReducer(),
	{},
	compose(
		applyMiddleware(),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// async reducers registry
store.asyncReducers = {};

const history = syncHistoryWithStore(browserHistory, store);

render(
	<AppContainer component={Routes} props={{ store, history }} />,
	document.getElementById('root')
);

/* eslint-disable global-require */
if (module.hot) {
	// Make reducers hot reloadable, see http://mxs.is/googmo
	module.hot.accept('./reducers', () => {
		const createReducers = require('./reducers').default;
		const nextReducers = createReducers(store.asyncReducers);

		store.replaceReducer(nextReducers);
	});

	module.hot.accept('./routes', () => {
		render(
			<AppContainer
				component={require('./routes').default}
				props={{ store, history }}
			/>,
			document.getElementById('root')
		);
	});
}
/* eslint-disable global-require */

// offline plugin install
install();
