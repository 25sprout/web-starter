/* eslint-disable global-require */
import page from 'page';
// import Home from './views/home.ejs';
import App from './components/App';
// import About from './views/about.ejs';
// import NotFound from './views/404.ejs';
import React from 'react';
import { render } from 'react-dom';
import './style.global.css';

const routingCallback = (view, data = {}) => (ctx, next) => {
	require.ensure([], require => {
		const req = require.context('./views', true, /\.ejs$/);
		const module = req(view);
		document.getElementById('view').innerHTML = module(data);
		next(ctx);
	});
};

page('/', routingCallback('./home.ejs'), () => {
	render(<App />, document.getElementById('root'));
});
page('/about', routingCallback('./about.ejs'));
page('*', routingCallback('./404.ejs'));
page.start();
