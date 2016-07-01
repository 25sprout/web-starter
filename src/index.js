/* eslint-disable global-require */
import page from 'page';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { install } from 'offline-plugin/runtime';
import 'sanitize.css/sanitize.css';
import './style.global.css';

// const req = require.context('./views', true, /\.ejs$/);

const routingCallback = (view, data = {}) => (ctx, next) => {
	require.ensure([], require => {
		const module = require(`./views/${view}.ejs`);
		document.getElementById('view').innerHTML = module(data);
		next(ctx);
	});
};

const noop = () => {};

page('/', routingCallback('home'), () => {
	render(<App />, document.getElementById('root'));
});
page('/about', routingCallback('about'), noop);
page('*', routingCallback('404'), noop);
page.start();

// offline plugin install
install();
