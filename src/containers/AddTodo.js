import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { addTodo } from '../actions/todos';

// local state handle input value
class AddTodo extends Component {
	constructor(props) {
		super(props);

		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			this.props.dispatch(addTodo(this.state.value));
			this.setState({ value: '' });
		}
	}

	render() {
		const { value } = this.state;

		return (
			<TextField
				hintText="Add a new todo..."
				value={value}
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				fullWidth
			/>
		);
	}
}

export default connect()(AddTodo);
