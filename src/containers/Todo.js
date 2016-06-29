import { connect } from 'react-redux';
import Todo from '../components/Todo';
import { checkTodo } from '../actions/todos';

const mapDispatchToProps = dispatch => ({
	onCheck: (id, isChecked) => {
		dispatch(checkTodo(id, isChecked));
	},
});

export default connect(null, mapDispatchToProps)(Todo);
