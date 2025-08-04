// src/services/AuthService.js
import axios from "axios";
import LocalStorage from "../Pages/LocalStorage";
import APIService from "./APIServices";

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${APIService.baseUrl}auth/jwt/create/`, {
      username,
      password,
    });
    console.log("Status code =", response.status);

    const { access, refresh } = response.data;

    LocalStorage.set(LocalStorage.accesToken, access);

    localStorage.setItem(LocalStorage.accesToken, access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("isAuthenticated", "true");

    return response.data;
  },
  // refresh(){
  //   `${APIService.baseUrl}auth/jwt/refresh/`
  // }

  logout: () => {
    localStorage.removeItem(LocalStorage.accesToken);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isAuthenticated");
  },

  getAccessToken: () => localStorage.getItem(LocalStorage.accesToken),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  isAuthenticated: () => localStorage.getItem("isAuthenticated") === "true",
};

export default AuthService;