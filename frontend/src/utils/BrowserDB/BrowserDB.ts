type BrowserDBKey = 'authToken' | 'theme';

export default class BrowserDB {
	static set(key: BrowserDBKey, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static get(key: BrowserDBKey) {
		const storedValue = localStorage.getItem(key);
		return storedValue === null ? undefined : JSON.parse(storedValue);
	}

	static delete(key: BrowserDBKey) {
		localStorage.removeItem(key);
	}
}
