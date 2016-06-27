import { handleActions } from 'redux-actions';

const counter = handleActions({
	INCREMENT: state => ({
		...state,
		count: state.count + 1,
	}),
	DECREMENT: state => ({
		...state,
		count: state.count - 1,
	}),
}, {
	count: 0,
});

export default counter;
