import api from "../../index";

export default async function detailsRequest(){
  return api.get("users/details");
}