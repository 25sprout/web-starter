import $ from 'jquery';
import page from 'page';
import Home from './views/home.ejs';
import About from './views/about.ejs';
import NotFound from './views/404.ejs';

const routingCallback = (view, data = {}) => () => {
	document.getElementById('view').innerHTML = view(data);
};

page('/', ctx => {
	if (!ctx.state.todos) {
		ctx.state.todos = [
			'setup enviroment',
			'write code',
			'take a break',
			'back to work',
		];

		$('.todos .todo .doneBtn').click(function (e) {
			e.preventDefault();
			ctx.state.todos.splice($(this).parent().index(), 1);
			console.log(ctx.state.todos, $(this).parent().index());

			page('/');
		});
	} else {
		document.getElementById('view').innerHTML = Home({
			todos: ctx.state.todos,
		});
	}
});
page('/about', routingCallback(About));
page('*', routingCallback(NotFound));
page.start();
