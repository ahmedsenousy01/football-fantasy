import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import { getAuthHeader } from "@/utils/auth/authorization";

export const webUrl = "https://football-fantasy-dev.onrender.com";
export const localUrl = "http://localhost:10000";

export default class Api {
  static readonly baseUrl = localUrl + "/api";
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
      headers: {
        ...getAuthHeader(),
        additionalHeaders,
      },
    });
  }

  static async put(
    path: string,
    body?: any,
    additionalHeaders?: AxiosRequestHeaders
  ) {
    return this.server.put(path, body, {
      headers: { ...getAuthHeader(), additionalHeaders },
    });
  }

  static async del(path: string, additionalHeaders?: AxiosRequestHeaders) {
    return this.server.delete(path, {
      headers: { ...getAuthHeader(), additionalHeaders },
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
