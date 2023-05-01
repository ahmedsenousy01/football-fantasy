import api from "@/utils/api/Api";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  data: {
    message: string;
    auth_token?: string;
  };
}

export default async function loginRequest(loginDetails: LoginRequestBody) {
  return api.post("users/login", loginDetails).catch(api.defaultCatcher);
}
