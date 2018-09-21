import { ANSWER_QUESTION } from '../constants/actionType';

const checker = store => next => action => {
	if (action.type === ANSWER_QUESTION) {
		const users = store.getState().users;
		const answers = Object.keys(users[action.authedUser].answers);
		if (answers.indexOf(action.qid) > -1) {
			return alert('You have already answered this question!');
		}
	}
	return next(action);
};

export default checker;
