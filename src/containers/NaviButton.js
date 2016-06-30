import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';

const NaviButton = ({ label, onClick, to }) => (
	<FlatButton label={label} onClick={() => onClick(to)} />
);

const mapDispatchToProps = dispatch => ({
	onClick: to => dispatch(push(to)),
});

export default connect(null, mapDispatchToProps)(NaviButton);
