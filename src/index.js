/* eslint-disable global-require */
import page from 'page';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './style.global.css';

const routingCallback = (view, data = {}) => (ctx, next) => {
	require.ensure([], require => {
		const req = require.context('./views', true, /\.ejs$/);
		const module = req(view);
		document.getElementById('view').innerHTML = module(data);
		next(ctx);
	});
};

const noop = () => {};

page('/', routingCallback('./home.ejs'), () => {
	render(<App />, document.getElementById('root'));
});
page('/about', routingCallback('./about.ejs'), noop);
page('*', routingCallback('./404.ejs'), noop);
page.start();
