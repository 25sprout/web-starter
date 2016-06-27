import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../actions/counter';

const mapStateToProps = state => ({
	count: state.counter.count,
});

const mapDispatchToProps = dispatch => ({
	increment: () => {
		dispatch(increment());
	},
	decrement: () => {
		dispatch(decrement());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
