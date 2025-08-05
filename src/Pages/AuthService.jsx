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
    localStorage.setItem("isAuthenticated", true);

    return response.data;
  },
  refresh: async () => {
    const refreshToken = localStorage.getItem(LocalStorage.refreshToken);

    if (!refreshToken) {
      console.error("No refresh token found.");
      return null;
    }

    try {
      const response = await axios.post(`${APIService.baseUrl}auth/jwt/refresh/`, {
        refresh: refreshToken,
      });

      const { access } = response.data;

      // Store the new access token
      localStorage.setItem(LocalStorage.accesToken, access);
    } catch (error) {
      console.error("Failed to refresh token", error);
      AuthService.logout(); 
      return null;
    }
  },


  logout: () => {
    localStorage.removeItem(LocalStorage.accesToken);
    localStorage.removeItem(LocalStorage.refreshToken);
    localStorage.removeItem(LocalStorage.isAuthenticated);
  },

  getAccessToken: () => localStorage.getItem(LocalStorage.accesToken),
  getRefreshToken: () => localStorage.getItem(LocalStorage.refreshToken),
  isAuthenticated: () => localStorage.getItem(LocalStorage.isAuthenticated) === true,
};

export default AuthService; 

 
 
 