import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import { Card, Row, Col } from 'antd';

import '../App.css';

const QuestionDetailPage = props => {
	const { questions, id } = props;

	const question = questions[id];

	return (
		<div>
			<h3
				style={{
					textAlign: 'center',
					fontSize: '24px',
					fontWeight: 'bold',
					margin: '20px auto',
				}}>
				Question Detail
			</h3>
			<div
				style={{
					textAlign: 'left',
					width: '350px',
					margin: '50px auto',
				}}>
				{question && <QuestionCard question={question} />}
			</div>
		</div>
	);
};

const mapStateToProps = ({ authedUser, questions }, props) => {
	const { id } = props.match.params;

	return {
		id,
		questions,
	};
};

export default connect(mapStateToProps)(QuestionDetailPage);
