import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Card } from 'antd';
import * as actions from '../actions/questions';

const { Meta } = Card;

const QuestionCard = props => {
	const { questions, authedUser, question, users, answerQuestion } = props;
	const avatar = users[question.author].avatarURL;

	const answered =
		Object.keys(users[authedUser].answers).indexOf(question.id) > -1
			? true
			: false;

	const checkedOptionOne =
		questions[question.id].optionOne.votes.indexOf(authedUser) > -1
			? true
			: false;
	const checkedOptionTwo =
		questions[question.id].optionTwo.votes.indexOf(authedUser) > -1
			? true
			: false;

	const checkVoteRate = option => {
		const optionName = option === 1 ? 'optionOne' : 'optionTwo';
		const total =
			question.optionOne.votes.length + question.optionTwo.votes.length;
		return (question[optionName].votes.length / total).toFixed(2) * 100;
	};

	const checkAnswer = option => {
		const answer = option === 1 ? 'optionOne' : 'optionTwo';
		answerQuestion(authedUser, question.id, answer);
	};

	return (
		<Card>
			<Link to={`/questions/${question.id}`}>
				<Meta
					avatar={<Avatar src={avatar} />}
					title={question.author + ' asked'}
				/>
			</Link>
			<p
				style={{
					fontSize: 14,
					marginBottom: 16,
					fontWeight: 500,
				}}>
				Would you rather...?
			</p>
			<Card
				type="inner"
				hoverable="true"
				className={checkedOptionOne ? 'answered' : ''}
				onClick={() => checkAnswer(1)}>
				{question.optionOne.text}
				{answered && (
					<span style={{ float: 'right', fontWeight: 'normal' }}>
						Votes: {question.optionOne.votes.length} (
						{checkVoteRate(1)}
						%)
					</span>
				)}
			</Card>
			<Card
				type="inner"
				hoverable="true"
				className={checkedOptionTwo ? 'answered' : ''}
				onClick={() => checkAnswer(2)}>
				{question.optionTwo.text}
				{answered && (
					<span style={{ float: 'right', fontWeight: 'normal' }}>
						Votes: {question.optionTwo.votes.length} (
						{checkVoteRate(2)}
						%)
					</span>
				)}
			</Card>
		</Card>
	);
};

const mapStateToProps = ({ authedUser, questions, users }) => {
	return {
		authedUser,
		questions,
		users,
	};
};

export default connect(
	mapStateToProps,
	actions
)(QuestionCard);
