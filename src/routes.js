import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import App from './components/App';
import createReducer from './reducers';

import { loadTodos, setFilter } from './actions/todos';

const injectReducer = store => (name, asyncReducer, action) => {
	if (!store.asyncReducers[name]) {
		store.asyncReducers[name] = asyncReducer;
		store.replaceReducer(createReducer(store.asyncReducers));
		if (action) {
			store.dispatch(action);
		}
	}
};

const createRoutes = store => ({
	path: '/',
	component: App,
	indexRoute: {
		getComponent: (nextState, cb) => require.ensure([], require =>
			cb(null, require('./components/Home').default)),
	},
	childRoutes: [
		{
			path: '/counter',
			getComponent: (nextState, cb) => require.ensure([], require => {
				const reducer = require('./reducers/counter').default;
				const component = require('./containers/Counter').default;
				injectReducer(store)('counter', reducer);
				cb(null, component);
			}),
		},
		{
			path: '/todos(/:filter)',
			getComponent: (nextState, cb) => require.ensure([], require => {
				const reducer = require('./reducers/todos').default;
				const component = require('./components/TodosCard').default;
				injectReducer(store)('todos', reducer, loadTodos());
				cb(null, component);
			}),
			onEnter: ({ params }) => {
				store.dispatch(setFilter(params.filter));
			},
			onChange: (prevState, nextState) => {
				console.log(prevState.params, nextState.params);
			},
		},
	],
});

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history} routes={createRoutes(store)} />
	</Provider>
);

export default Routes;
