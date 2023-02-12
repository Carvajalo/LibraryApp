import axios from "axios";
import { IJwt } from "../context/Users/loginRoutes";

export function setToken(token: IJwt) {
  localStorage.setItem("token", JSON.stringify(token));
  axios.defaults.headers["x-access-token"] = token.token;
}

export function removeToken() {
  localStorage.removeItem("token");
  axios.defaults.headers["x-access-token"] = "";
}

export function getToken(): IJwt {
  const token = localStorage.getItem("token") as string;
  return JSON.parse(token);
}
