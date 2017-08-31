import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			console.log('action payload', action.payload.token);
			return action.payload || false;
		default:
			return state;
	}
}
