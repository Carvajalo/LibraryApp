import axios from "axios";
import { config } from "../../config";

interface ILogin {
  email: string;
  password: string;
}

export const login = async (user: ILogin) => {
  const { data } = await axios(config("Users/login", "post", user));
};
