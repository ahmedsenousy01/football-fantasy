import api from '@/utils/api/Api';

export default async function userDetailsRequest() {
	return api.get('/users/details').catch(api.defaultCatcher);
}
