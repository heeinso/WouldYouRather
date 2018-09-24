import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Card, List } from 'antd';

const { Meta } = Card;

const Leaderboard = props => {
	const { users } = props;
	const sorting = Object.values(users).sort((a, b) => {
		const sumA = Object.keys(a.answers).length + a.questions.length;
		const sumB = Object.keys(b.answers).length + b.questions.length;
		return sumB - sumA;
	});

	return (
		<div>
			<h3
				style={{
					textAlign: 'center',
					fontSize: '24px',
					fontWeight: 'bold',
					margin: '20px auto',
				}}>
				Ranking
			</h3>
			<List
				grid={{ gutter: 16, column: 1 }}
				dataSource={sorting}
				renderItem={user => {
					const content = `Asked: ${
						user.questions.length
					}, Answered: ${Object.keys(user.answers).length}`;
					return (
						<List.Item key={user.id}>
							<div
								style={{
									textAlign: 'left',
									width: '350px',
									margin: '0 auto',
								}}>
								<Card>
									<Meta
										avatar={<Avatar src={user.avatarURL} />}
										title={user.name}
										description={content}
									/>
								</Card>
							</div>
						</List.Item>
					);
				}}
			/>
		</div>
	);
};

const mapStateToProps = ({ users }) => {
	return {
		users,
	};
};

export default connect(mapStateToProps)(Leaderboard);
