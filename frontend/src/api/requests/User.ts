import api from "@/utils/api/Api";

// ------- REGISTRATION -------
export interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountLeague: string;
}

export interface RegisterResponseData {
  status?: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
}

export function registerRequest(requestBody: RegisterRequestBody) {
  return api.post("users/register", requestBody).catch(api.defaultCatcher);
}

// ------- LOGIN -------
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

export async function loginRequest(loginDetails: LoginRequestBody) {
  console.log(loginDetails);
  return api.post("users/login", loginDetails).catch(api.defaultCatcher);
}

// ------- GET DETAILS -------
export async function userDetailsRequest() {
  return api.get("/users/details");
}
