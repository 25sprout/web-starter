import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import * as reducers from './reducers';
import Routes from './routes';
import './style.global.css';

const logger = createLogger();

const store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer,
	}),
	{},
	compose(
		applyMiddleware(logger),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
	<AppContainer component={Routes} props={{ store, history }} />,
	document.getElementById('root')
);

/* eslint-disable global-require */
if (module.hot) {
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
/* eslint-disable */
