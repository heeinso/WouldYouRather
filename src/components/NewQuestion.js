import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewQuestion extends Component {
	render() {
		return <div>NewQuestion</div>;
	}
}

const mapStateToProps = ({ authedUser, users }) => {
	return {
		authedUser,
		users,
	};
};

export default connect(mapStateToProps)(NewQuestion);
