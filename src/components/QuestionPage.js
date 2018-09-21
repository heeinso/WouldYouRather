import React from 'react';
import { connect } from 'react-redux';

const QuestionPage = () => {
	return <div>QuestionPage</div>;
};

const mapStateToProps = ({ authedUser, questions }, props) => {
	const { id } = props.match.params;

	return {
		id,
		questions,
	};
};

export default connect(mapStateToProps)(QuestionPage);
