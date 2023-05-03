import api from '@/utils/api/Api';

export const allLeagues = ["La Liga", "Premiere League", "Serie A", "Ligue 1", "Bundesliga"] as const;

export interface RegisterRequestBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	accountLeague:string;
}

export interface RegisterResponseData {
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
	console.log(requestBody);
	return api.post('users/register', requestBody).catch(api.defaultCatcher);
}
