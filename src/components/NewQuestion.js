import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Form, Select, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class NewQuestion extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const { dispatch, history } = this.props;
		const optionOneText = this.props.form.getFieldValue('One');
		const optionTwoText = this.props.form.getFieldValue('Two');
		this.props.form.validateFields(err => {
			if (!err) {
				dispatch(handleAddQuestion(optionOneText, optionTwoText));
				history.push('/');
			} else {
				console.log('Error message: ', err);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<h3
					style={{
						textAlign: 'center',
						fontSize: '24px',
						fontWeight: 'bold',
						margin: '20px auto',
					}}>
					Add Question
				</h3>
				<Form
					onSubmit={this.handleSubmit}
					className="new-question-form">
					<FormItem
						label="OptionOne"
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 12 }}>
						{getFieldDecorator('One', {
							rules: [
								{
									required: true,
									message: 'Please input option one!',
								},
							],
						})(<Input placeholder="Option One" />)}
					</FormItem>
					<FormItem
						label="OptionTwo"
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 12 }}>
						{getFieldDecorator('Two', {
							rules: [
								{
									required: true,
									message: 'Please input option two!',
								},
							],
						})(<Input placeholder="Option Two" />)}
					</FormItem>
					<FormItem wrapperCol={{ span: 12, offset: 5 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const WrappedNewQuestion = Form.create()(NewQuestion);

const mapStateToProps = ({ authedUser, users }) => {
	return {
		authedUser,
		users,
	};
};

export default connect(mapStateToProps)(WrappedNewQuestion);
