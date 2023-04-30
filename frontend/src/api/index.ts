import axios, { AxiosRequestHeaders } from 'axios';
import { getAuthHeader } from '../utils/auth/authorization';

export default class api {
	static readonly baseUrl = 'http://localhost:5000/api';
	static readonly server = axios.create({
		baseURL: this.baseUrl,
	});

	static async get(path: string, additionalHeaders?: AxiosRequestHeaders) {
		return this.server.get(path, {
			headers: {
				...getAuthHeader(),
				...additionalHeaders,
			},
		});
	}

	static async post(
		path: string,
		body: any,
		additionalHeaders?: AxiosRequestHeaders
	) {
		return this.server.post(path, body, {
			...getAuthHeader(),
			headers: additionalHeaders,
		});
	}

	static async put(
		path: string,
		body: any,
		additionalHeaders?: AxiosRequestHeaders
	) {
		return this.server.put(path, body, {
			...getAuthHeader(),
			headers: additionalHeaders,
		});
	}

	static async del(path: string, additionalHeaders?: AxiosRequestHeaders) {
		return this.server.delete(path, {
			...getAuthHeader(),
			headers: additionalHeaders,
		});
	}
}
