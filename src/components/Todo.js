import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const Todo = ({ todoId, text, isChecked, onCheck }) => (
	<ListItem
		leftCheckbox={
			<Checkbox
				defaultChecked={isChecked}
				onCheck={(e, checked) => onCheck(todoId, checked)}
			/>
		}
		primaryText={text}
	/>
);

export default Todo;
