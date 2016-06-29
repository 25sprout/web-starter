import { connect } from 'react-redux';
import Todos from '../components/Todos';

const mapStateToProps = state => ({
	todos: state.todos.todos,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
