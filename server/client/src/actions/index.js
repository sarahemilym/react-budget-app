import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const loginUser = (email, password) => async dispatch => {
	const res = await axios.post('/auth/login', {
		email: email,
		password: password
	});
	console.log('AT LOGIN USER', res.data);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const signupUser = (name, email, password) => async dispatch => {
	const res = await axios.post('/auth/signup', {
		name: name,
		email: email,
		password: password
	});
	console.log('RESPO+NSE DATA', res.data);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const test = () => async dispatch => {
	const res = await axios.get('http://localhost:8080/auth/facebook');

	console.log('res', res);
};
