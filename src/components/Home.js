import React from 'react';
import sprout from '../assets/sprout.png';
import { Link } from 'react-router';

const Home = () => (
	<div>
		<h1>Hello, sprouters!</h1>
		<img src={sprout} alt="sprout" />
		<nav>
			<Link to="/counter">Counter</Link>
			<Link to="/todos">Todos</Link>
		</nav>
	</div>
);

export default Home;
