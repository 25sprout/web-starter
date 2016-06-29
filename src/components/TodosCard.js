import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card } from 'material-ui/Card';
import BackToHome from './BackToHome';
import FilterGroup from '../containers/FilterGroup';
import Todos from '../containers/Todos';
import AddTodo from '../containers/AddTodo';

const TodosCard = () => (
	<MuiThemeProvider>
		<Card style={{ padding: '30px 40px' }}>
			<BackToHome />
			<FilterGroup />
			<Todos />
			<AddTodo />
		</Card>
	</MuiThemeProvider>
);

export default TodosCard;
