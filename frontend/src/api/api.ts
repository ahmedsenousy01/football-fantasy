import axios, { AxiosRequestHeaders } from "axios";
import { getAuthHeader } from "@/utils/auth/authorization";

export default class api {
  static readonly baseUrl = "https://football-fantasy-dev.onrender.com/api/";
  static readonly server = axios.create({
    baseURL: api.baseUrl,
  });

  static async get(path: string, additionalHeaders?: AxiosRequestHeaders) {
    return api.server.get(path, {
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
    return api.server.post(path, body, {
      ...getAuthHeader(),
      headers: additionalHeaders,
    });
  }

  static async put(
    path: string,
    body: any,
    additionalHeaders?: AxiosRequestHeaders
  ) {
    return api.server.put(path, body, {
      ...getAuthHeader(),
      headers: additionalHeaders,
    });
  }

  static async del(path: string, additionalHeaders?: AxiosRequestHeaders) {
    return api.server.delete(path, {
      ...getAuthHeader(),
      headers: additionalHeaders,
    });
  }
}
