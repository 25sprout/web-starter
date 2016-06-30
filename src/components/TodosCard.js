import React from 'react';
import { Card } from 'material-ui/Card';
import BackToHome from './BackToHome';
import FilterGroup from '../containers/FilterGroup';
import Todos from '../containers/Todos';
import AddTodo from '../containers/AddTodo';

const TodosCard = () => (
	<Card style={{ padding: '30px 40px' }}>
		<BackToHome />
		<FilterGroup />
		<Todos />
		<AddTodo />
	</Card>
);

export default TodosCard;
