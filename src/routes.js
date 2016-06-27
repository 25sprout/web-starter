import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Counter from './containers/Counter';

const routes = {
	path: '/',
	component: App,
	indexRoute: {
		component: Home,
	},
	childRoutes: [
		{
			path: '/counter',
			component: Counter,
		},
	],
};

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
);

export default Routes;
