import LocalStorage from "./LocalStorage";

class APIService {
  // static baseUrl = "https://api.wovtours.com/";
  // static baseUrl = "https://api-stage.wovtours.com/";
  static baseUrl = "http://127.0.0.1:8082/";

  static isUnauthenticated(status) {
    return status === 401;
  }
  static isDeleted(status) {
    return status === 204;
  }
  static isError(status) {
    // console.log("status >= 300 = ",status >= 300);

    return status >= 300;
  }

  static isSuccess(status) {
    return status <= 300;
  }

  static async  refreshToken() {
    const url = this.baseUrl + "auth/jwt/refresh/";
    console.log("URL = ", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: LocalStorage.getAccesToken(),
      },
      body: JSON.stringify({
        refresh: LocalStorage.get(LocalStorage.refreshToken),
      }),
    });
    console.log("response.status = ", response.status);
    if (APIService.isUnauthenticated(response.status)) {
      LocalStorage.logout();
      return false;
    } else if (APIService.isSuccess(response.status)) {
      const auth = await response.json();
      console.log("auth = ", auth);
      LocalStorage.set(LocalStorage.accesToken, auth.access);
      return true;
    }
  }
}
export default APIService; 