import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const createReducer = asyncReducers => combineReducers({
	routing: routerReducer,
	...asyncReducers,
});

export default createReducer;
