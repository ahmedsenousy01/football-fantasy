import BrowserDB from "../../BrowserDB";

export function getStoredAuthToken(){
  return BrowserDB.get("authToken");
}

export function deleteAuthToken(){
  BrowserDB.delete("authToken");
}

type AuthorizationHeader = {
  Authorization?: string;
}

export function getAuthHeader(token?:string):AuthorizationHeader{
  token = token ?? getStoredAuthToken();

  if(token === undefined){
    return {};
  }

  return {
    Authorization: "Bearer " + token
  };
}
