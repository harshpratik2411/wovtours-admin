// class LocalStorage {
//   static set(key, value) {
//     localStorage.setItem(key, value);
//   }
//   static get(key) {
//     return localStorage.getItem(key);
//   }
//   static remove(key) {
//     localStorage.removeItem(key);
//   }
// }
       class LocalStorage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value; // return raw if not JSON
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
