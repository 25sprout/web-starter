import { connect } from 'react-redux';
import { checkTodo, deleteTodo } from '../actions/todos';
import Todo from '../components/Todo';

const mapDispatchToProps = dispatch => ({
	onCheck: (id, isChecked) => dispatch(checkTodo(id, isChecked)),
	onDelete: id => dispatch(deleteTodo(id)),
});

export default connect(null, mapDispatchToProps)(Todo);
