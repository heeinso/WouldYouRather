import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { handleInitialData } from './actions';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import NewQuestion from './components/NewQuestion';
import QuestionDetailPage from './components/QuestionDetailPage';
import NotFound from './components/NotFound';
import './App.css';

const { Footer, Content } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		const { loggedIn } = this.props;

		console.log('Is logged In? ', loggedIn);

		return (
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Navbar />

					<Content style={{ padding: '0 50px' }}>
						<div
							style={{
								background: '#fff',
								padding: 24,
								minHeight: '85vh',
							}}>
							{loggedIn ? (
								<Switch>
									<Route path="/" exact component={Home} />
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
										component={QuestionDetailPage}
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
							display: 'block',
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
