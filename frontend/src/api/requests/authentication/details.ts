import api from "../../index";

export default async function userDetailsRequest(){
  return api.get("users/details");
}