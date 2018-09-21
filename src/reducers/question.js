import {
	ADD_QUESTION,
	ANSWER_QUESTION,
	RECEIVE_QUESTIONS,
} from '../constants/actionType';

export default function questions(state = {}, action) {
	switch (action.type) {
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question,
			};

		case ANSWER_QUESTION:
			return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat(
							action.authedUser
						),
					},
				},
			};

		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};

		default:
			return state;
	}
}
