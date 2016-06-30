import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const DeleteBtn = ({ onDelete, todoId }) => (
	<ActionDelete
		style={{
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: '4px',
			margin: 'auto',
			opacity: '1',
			transition: 'opacity 0.2s ease-out',
		}}
		onClick={e => {
			e.preventDefault();
			e.stopPropagation();
			onDelete(todoId);
		}}
	/>
);

const Todo = ({ todoId, text, isChecked, onCheck, onDelete }) => (
	<ListItem
		leftCheckbox={
			<Checkbox
				defaultChecked={isChecked}
				onCheck={(e, checked) => onCheck(todoId, checked)}
			/>
		}
		rightIconButton={<DeleteBtn onDelete={onDelete} todoId={todoId} />}
		primaryText={text}
	/>
);

export default Todo;
