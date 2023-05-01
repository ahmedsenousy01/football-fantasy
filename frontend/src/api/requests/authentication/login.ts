import api from '@/utils/api/Api';
import { AxiosError } from 'axios';

export interface LoginDetails {
	email: string;
	password: string;
}

export default async function loginRequest(loginDetails: LoginDetails) {
	return api.post('/users/login', loginDetails).catch((error: AxiosError) => {
		if (error.response === undefined) {
			console.log('ERROR: ', error);
			return new AxiosError('Backend sent error without response');
		}
		if (error.response.status < 500) {
			return error.response;
		} else {
			console.log('ERROR: ', error);
			return error;
		}
	});
}
