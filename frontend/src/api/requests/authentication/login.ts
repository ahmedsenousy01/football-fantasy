import api from "../../index";

interface LoginDetails{
  email:string;
  password:string;
}

export default async function loginRequest(loginDetails:LoginDetails){
  return api.post("users/login", loginDetails);
}