import {
	ADD_QUESTION,
	RECEIVE_QUESTIONS,
	ANSWER_QUESTION,
} from '../constants/actionType';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(optionA, optionB) {
	return function(dispatch, getState) {
		const { authedUser } = getState();

		const questionInfo = { optionA, optionB, auther: authedUser };

		return saveQuestion(questionInfo).then(question => {
			dispatch(addQuestion(question));
		});
	};
}

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function answerQuestion(authedUser, qid, answer) {
	return {
		type: ANSWER_QUESTION,
		authedUser,
		qid,
		answer,
	};
}

export function handleAnswerQuestion(question, answer) {
	return function(dispatch, getState) {
		const { authedUser } = getState();

		const answerInfo = { authedUser, qid: question.id, answer };

		return saveQuestionAnswer(answerInfo).then(() => {
			dispatch(answerQuestion(authedUser, question, answer));
		});
	};
}
