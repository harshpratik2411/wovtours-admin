class LocalStorage {
  static accesToken = "accessToken";
  static refreshToken = "refreshToken";
  static isAuthenticated = "isAuthenticated";

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
export default LocalStorage
