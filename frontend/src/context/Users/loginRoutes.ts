import axios, { AxiosError } from "axios";
import { config } from "../../config";
import { setToken, getToken, removeToken } from "../../utils/jwt-helpers";

export interface IJwt {
  token: string;
  role: string;
  name: string;
}

export const login = async (email: string, password: string) => {
  try {
    const petition = await axios(
      config("post", "Users/login", { email, password })
    );
    const auth: IJwt = petition.data;
    setToken(auth);
    return auth;
  } catch (e: any | AxiosError) {
    return e.response.status;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const petition = await axios(
      config("post", "Users/register", { name, email, password })
    );
    console.log(petition.data);
    return petition.data;
  } catch (e: any | AxiosError) {
    return e.response.status;
  }
};

export const logoOut = async (token: string) => {
  try {
    const petition = await axios(config("post", "Users/logout", {}, token));
    removeToken();
    console.log(petition.data);
    return petition.data;
  } catch (e) {
    console.log(e);
  }
};

const adminNewUser = async (
  name: string,
  email: string,
  password: string,
  token: string,
  role: "admin" | "user"
) => {
  try {
    const petition = await axios(
      config("post", "Users/register", { name, email, password, role }, token)
    );
    console.log(petition.data);
    return petition.data;
  } catch (e) {
    console.log(e);
  }
};
