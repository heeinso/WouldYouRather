import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List } from 'antd';

import QuestionCard from './QuestionCard';
import '../App.css';

class Home extends Component {
	state = {
		toggleAnswer: false,
		key: 'UnAnswered',
	};

	onTabChange = (key, type) => {
		this.setState({ [type]: key, toggleAnswer: !this.state.toggleAnswer });
	};

	render() {
		const { authedUser, users, questions } = this.props;
		const { toggleAnswer } = this.state;

		const filteredByUser = Object.values(questions).filter(question => {
			const answeredQuestions =
				question.optionOne.votes.indexOf(authedUser) > -1 ||
				question.optionTwo.votes.indexOf(authedUser) > -1;
			return toggleAnswer ? answeredQuestions : !answeredQuestions;
		});

		const sortedByTime = filteredByUser.sort(
			(a, b) => b.timestamp - a.timestamp
		);

		const tabList = [
			{
				key: 'UnAnswered',
				tab: 'UnAnswered Questions',
			},
			{
				key: 'Answered',
				tab: 'Answered Questions',
			},
		];

		const contentList = {
			UnAnswered: (
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 1,
						md: 2,
						lg: 2,
						xl: 3,
						xxl: 3,
					}}
					dataSource={sortedByTime}
					renderItem={question => {
						return (
							<List.Item key={question.key}>
								<QuestionCard question={question} />
							</List.Item>
						);
					}}
				/>
			),
			Answered: (
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 1,
						md: 2,
						lg: 2,
						xl: 3,
						xxl: 3,
					}}
					dataSource={sortedByTime}
					renderItem={question => {
						return (
							<List.Item key={question.key}>
								<QuestionCard question={question} />
							</List.Item>
						);
					}}
				/>
			),
		};
		return (
			<div>
				<Card
					style={{ width: '100%' }}
					title="Home"
					tabList={tabList}
					activeTabKey={this.state.key}
					onTabChange={key => {
						this.onTabChange(key, 'key');
					}}>
					{contentList[this.state.key]}
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ authedUser, questions, users }) => {
	return {
		authedUser,
		questions,
		users,
	};
};

export default connect(mapStateToProps)(Home);
