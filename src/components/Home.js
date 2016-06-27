import React from 'react';
import sprout from '../assets/sprout.png';
import { Link } from 'react-router';

const Home = () => (
	<div>
		<h1>Hello, sprouters!</h1>
		<Link to="/counter">
			<img src={sprout} alt="sprout" />
		</Link>
	</div>
);

export default Home;
