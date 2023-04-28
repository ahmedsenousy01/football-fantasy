import axios, { AxiosRequestHeaders } from 'axios';
export const apiBase = 'http://localhost:5000/api/';
const server = axios.create({
	baseURL: apiBase,
});

export async function get(
	path: string,
	additionalHeaders?: AxiosRequestHeaders
) {
	return server.get(path, {
		headers: additionalHeaders,
	});
}

export async function post(
	path: string,
	body: any,
	additionalHeaders?: AxiosRequestHeaders
) {
	return server.post(path, body, {
		headers: additionalHeaders,
	});
}

export async function put(
	path: string,
	body: any,
	additionalHeaders?: AxiosRequestHeaders
) {
	return server.put(path, body, {
		headers: additionalHeaders,
	});
}

export async function del(
	path: string,
	additionalHeaders?: AxiosRequestHeaders
) {
	return server.delete(path, {
		headers: additionalHeaders,
	});
}
