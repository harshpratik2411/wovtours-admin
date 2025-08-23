class LocalStorage {
  static accesToken = "accessToken";
  static refreshToken = "refreshToken";
  static isAuthenticated = "isAuthenticated";

  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static getAccesToken(key) {
    return "Bearer " + localStorage.getItem(this.accesToken);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static logout(){
    localStorage.removeItem(LocalStorage.isAuthenticated);
    navigate("/login");
  }
}
export default LocalStorage;
