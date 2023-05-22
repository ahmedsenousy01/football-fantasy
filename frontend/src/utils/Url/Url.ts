let searchQueryString = "";
let searchParams = new URLSearchParams();

export function getUrlParams() {
  if (searchQueryString !== window.location.search) {
    searchQueryString = window.location.search;
    searchParams = new URLSearchParams(window.location.search);
  }
  return searchParams;
}

export function dataToSearchParams(data: Record<string, string>) {
  let searchParams = new URLSearchParams();
  for (let entry of Object.entries(data)) {
    searchParams.append(entry[0], entry[1]);
  }
  return searchParams.toString();
}

export function getUrlParam(paramName: string) {
  return getUrlParams().get(paramName);
}

export function redirectTo(destination: string) {
  window.location.replace(destination);
}

export function navigateTo(destination: string) {
  window.location.assign(destination);
}

export function getCurrentPathName() {
  return window.location.pathname;
}

export function getPathBase(path: string) {
  const arr = path.split("/");
  return "/" + arr[1];
}

export function getCurrentPathBase() {
  return getPathBase(getCurrentPathName());
}
