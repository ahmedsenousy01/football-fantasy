export default class BrowserDB{
  static set(key:string, value:any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key:string){
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? undefined : JSON.parse(storedValue);
  }

  static delete(key:string){
    localStorage.removeItem(key);
  }
}