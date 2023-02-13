import axios from "axios";
import { config } from "@/config";

export const getAllUsers = async (token: string) => {
  const { data } = await axios(config("get", "users", [], token));
  return data;
};
