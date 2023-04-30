import api from '@/api/index';

interface RegistrationDetails {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function registerRequest(
	registrationDetails: RegistrationDetails
) {
	return api.post('users/register', registrationDetails);
}
