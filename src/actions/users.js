import { RECEIVE_USERS } from '../constants/actionType';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users,
	};
}
