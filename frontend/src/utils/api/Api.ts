import axios, { AxiosRequestHeaders, AxiosError } from 'axios';
import { getAuthHeader } from '@/utils/auth/authorization';

const webUrl = "https://football-fantasy-dev.onrender.com";

export default class Api {
	static readonly baseUrl = webUrl + '/api';
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

	static defaultCatcher(error: AxiosError) {
		if (error.response === undefined) {
			console.log("ERROR: ", error);
			return new AxiosError("Backend sent error without response");
		}
		if (error.response.status < 500) {
			return error.response;
		} else {
			console.log("ERROR: ", error);
			return error;
		}
	}
}
