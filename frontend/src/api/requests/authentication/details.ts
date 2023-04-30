import api from '@/api/index';

export default async function userDetailsRequest() {
	return api.get('/users/details');
}
