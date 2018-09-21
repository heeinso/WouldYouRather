import React from 'react';
import { connect } from 'react-redux';

const NotFound = () => {
	return <div>Not Found</div>;
};

const mapStateToProps = ({ users }) => users;

export default connect(mapStateToProps)(NotFound);
