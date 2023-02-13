import { config } from "@/config";
import axios from "axios";
import { IRequests } from "./IRequest";
import { IHistory, IUserHistory } from "./IHistory";

export const getAllRequests = async () => {
  const { data } = await axios(config("get", "books/requests"));
  return data as IRequests[];
};

export const getHistory = async () => {
  const { data } = await axios(config("get", "books/history"));
  return data as IHistory[];
};

export const userHistory = async (token: string) => {
  const { data } = await axios(config("get", "Books/UserRequest", [], token));
  return data as IUserHistory[];
};
