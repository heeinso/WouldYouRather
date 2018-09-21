import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { handleInitialData } from './actions';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import NewQuestion from './components/NewQuestion';
import QuestionPage from './components/QuestionPage';
import NotFound from './components/NotFound';
import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Layout style={{ height: '100vh' }}>
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
						</Menu>
					</Header>

					<Content style={{ padding: '0 50px' }}>
						<div
							style={{
								background: '#fff',
								padding: 24,
								height: '90vh',
							}}>
							{this.props.loggedIn ? (
								<Switch>
									<Route
										path="/"
										exact
										component={Dashboard}
									/>
									<Route
										path="/login"
										exact
										component={Login}
									/>
									<Route
										path="/add"
										exact
										component={NewQuestion}
									/>
									<Route
										path="/leaderboard"
										exact
										component={Leaderboard}
									/>
									<Route
										path="/questions/:id"
										exact
										component={QuestionPage}
									/>
									<Route component={NotFound} />
								</Switch>
							) : (
								<Route component={Login} />
							)}
						</div>
					</Content>

					<Footer
						style={{
							textAlign: 'center',
							position: 'absolute',
							bottom: 0,
							width: '100%',
						}}>
						Would You Rather ©2018 Created by heeinso
					</Footer>
				</Layout>
			</Router>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loggedIn: authedUser !== null,
	};
}

export default connect(mapStateToProps)(App);
