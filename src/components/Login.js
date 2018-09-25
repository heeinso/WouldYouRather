import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Avatar, Form, Select, Button } from 'antd';

import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';
import '../App.css';

const FormItem = Form.Item;
const Option = Select.Option;

class Login extends Component {
	state = {
		userId: null,
	};

	handleSubmit = e => {
		e.preventDefault();
		const { dispatch, history } = this.props;
		this.props.form.validateFields(err => {
			if (!err) {
				dispatch(setAuthedUser(this.state.userId));
				if (window.location.pathname !== '/login') {
					return;
				}
				history.push('/');
			} else {
				console.log('Error message: ', err.user.errors[0].message);
			}
		});
	};

	handleSelectChange = value => {
		const userId = value;

		this.setState({
			userId,
		});
	};

	componentDidMount() {
		this.props.dispatch(clearAuthedUser());
	}

	render() {
		const { users } = this.props;
		const { getFieldDecorator } = this.props.form;

		const avatar = this.state.userId
			? users[this.state.userId].avatarURL
			: 'https://i.imgur.com/dGo8DOk.jpg';

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Avatar
					size="large"
					src={avatar}
					style={{
						width: 100,
						height: 100,
						top: '-50px',
						left: '150px',
						position: 'relative',
					}}
				/>
				<FormItem
					label="User"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}>
					{getFieldDecorator('user', {
						rules: [
							{
								required: true,
								message: 'Please select a user!',
							},
						],
					})(
						<Select
							placeholder="Select User"
							onChange={this.handleSelectChange}>
							{Object.keys(users).map(key => (
								<Option value={users[key].id} key={key}>
									{users[key].id}
								</Option>
							))}
						</Select>
					)}
				</FormItem>
				<FormItem wrapperCol={{ span: 12, offset: 5 }}>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button">
						Login
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedLogin = Form.create()(Login);

const mapStateToProps = ({ users }) => {
	return {
		users,
	};
};

export default withRouter(connect(mapStateToProps)(WrappedLogin));
