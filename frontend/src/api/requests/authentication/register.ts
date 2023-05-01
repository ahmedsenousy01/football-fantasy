import api from '@/utils/api/Api';

export interface RegisterRequestBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ResultResponseData {
	status?: boolean;
	message: string;
	data?:{
		id:string;
		email:string;
	}
}

export default function registerRequest(
	requestBody: RegisterRequestBody
) {
	return api.post('users/register', requestBody).catch(api.defaultCatcher);
}
