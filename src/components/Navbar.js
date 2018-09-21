import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar, Layout, Menu } from 'antd';

const { Header } = Layout;

const Navbar = props => {
	const { authedUser, users } = props;
	const avatar = authedUser
		? users[authedUser].avatarURL
		: 'https://i.imgur.com/dGo8DOk.jpg';

	const loggedIn = authedUser !== null;

	return (
		<Fragment>
			<Header>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px' }}>
					<Menu.Item key="1">
						<NavLink to="/">Home</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/leaderboard">Leaderboard</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/add">Add Question</NavLink>
					</Menu.Item>

					{loggedIn ? (
						<Menu.Item
							key="5"
							style={{
								float: 'right',
								marginRight: '50px',
							}}>
							<Avatar
								size="small"
								src={avatar}
								style={{ marginRight: '10px' }}
							/>
							{authedUser} {' | '}
							<NavLink
								to="/login"
								exact
								style={{ display: 'inline' }}>
								Logout
							</NavLink>
						</Menu.Item>
					) : (
						<Menu.Item
							key="4"
							style={{
								float: 'right',
								marginRight: '100px',
							}}>
							<NavLink to="/login" exact>
								Login
							</NavLink>
						</Menu.Item>
					)}
				</Menu>
			</Header>
		</Fragment>
	);
};

const mapStateToProps = ({ authedUser, users }) => {
	return {
		authedUser,
		users,
	};
};

export default connect(mapStateToProps)(Navbar);
