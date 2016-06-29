import { connect } from 'react-redux';
import FilterGroup from '../components/FilterGroup';
import { replace } from 'react-router-redux';

const mapStateToProps = state => ({
	filter: state.todos.filter || 'all',
});

const mapDispatchToProps = dispatch => ({
	onChange: e => {
		const filter = e.target.value;
		dispatch(replace(`/todos/${filter === 'all' ? '' : filter}`));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterGroup);
