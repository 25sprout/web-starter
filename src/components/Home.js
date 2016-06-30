import React from 'react';
import sprout from '../assets/sprout.png';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import NaviButton from '../containers/NaviButton';

const Home = () => (
	<Card style={{ padding: '30px 40px' }}>
		<CardTitle title="Hello, sprouters!" />
		<CardMedia>
			<img src={sprout} alt="sprout" />
		</CardMedia>
		<CardActions>
			<NaviButton label="COUNTER" to="/counter" />
			<NaviButton label="TODOS" to="/todos" />
		</CardActions>
	</Card>
);

export default Home;
