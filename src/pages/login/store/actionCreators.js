import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.CHANGE_LOGIN,
	value: false
})

export const login = (username, password) => {
	return (dispatch) => {
		axios.get('/api/login.json?username=' + username + '&password=' + password).then((res) => {
			const result = res.data.data;
			if (result) {
				dispatch(changeLogin())
			} else {
				alert('Login Failed')
			}
		})
	}
}