// src/services/AuthService.js
import axios from "axios";
import LocalStorage from "../Pages/LocalStorage";

const API_URL = "https://api-stage.wovtours.com/auth/jwt";

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/create/`, {
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
