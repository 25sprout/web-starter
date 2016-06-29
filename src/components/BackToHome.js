import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const BackToHome = ({ onClick }) => (
	<FlatButton label="Home" icon={<ActionHome />} onClick={onClick} />
);

const mapDispatchToProps = dispatch => ({
	onClick: () => dispatch(push('/')),
});

export default connect(null, mapDispatchToProps)(BackToHome);
