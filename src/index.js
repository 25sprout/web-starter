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

page('/', routingCallback('home', { sprout: require('./assets/sprout.png') }), noop);

page('/counter', routingCallback('counter', { number: 0, styles: require('./css/counter.css') }), () => {
	require.ensure([], require => {
		const $ = require('jquery');
		const module = require('./js/counter').default;
		$(document).ready(module);
	});
});

page('/react', routingCallback('react'), () => {
	require.ensure([], require => {
		const React = require('react');
		const render = require('react-dom').render;
		const Counter = require('./components/Counter').default;
		render(<Counter />, document.getElementById('counter'));
	});
});

page('/:lang/about', ctx => {
	require.ensure([], require => {
		const module = require(`./views/about.ejs`);
		const headingMapping = {
			EN: 'About',
			TW: '關於我們',
		};
		const heading = headingMapping[ctx.params.lang] || page.redirect('/404');
		document.getElementById('view').innerHTML = module({ heading });
	});
});

page('/404', routingCallback('404'), noop);

page('*', '/404');

page.start();

// offline plugin install
install();
