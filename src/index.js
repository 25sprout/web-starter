/* eslint-disable global-require */
import page from 'page';
import { install } from 'offline-plugin/runtime';
import 'sanitize.css/sanitize.css';
import './style.global.css';

const routingCallback = (view, data = {}) => (ctx, next) => {
	require.ensure([], require => {
		const module = require(`./views/${view}.ejs`);
		document.getElementById('view').innerHTML = module(data);
		next(ctx);
	});
};

const noop = () => {};

history.redirect();
page.base();
page('/', routingCallback('home'), () => {
	require.ensure([], require => {
		const React = require('react');
		const render = require('react-dom').render;
		const App = require('./components/App').default;
		render(<App />, document.getElementById('root'));
	});
});
page('/about', routingCallback('about'), noop);
page('*', routingCallback('404'), noop);
page.start();

// offline plugin install
install();
