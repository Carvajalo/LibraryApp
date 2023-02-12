import axios from "axios";
import { config } from "../../config";
import { IBook, IBookRequest } from "./IBook";

interface IBookDeletedResponse {
  message: string;
  deletedBook: IBook;
}

export const getAllBooks = async () => {
  const books = await axios(config("get", "books"));
  return books.data as IBook[];
};

export const getBookById = async (id: string) => {
  return (await axios(config("get", `/books/${id}`))) as IBook;
};

export const createBook = async (book: IBookRequest) => {
  return (await axios(config("post", "/books/add", book))) as IBook;
};

export const deleteBook = async (id: string, token: string) => {
  return (await axios(
    config("delete", `/books/${id}`, [], token)
  )) as IBookDeletedResponse;
};

export const updateBook = async (
  id: string,
  book: IBookRequest,
  token: string
) => {
  return (await axios(
    config("put", `/books/update/${id}`, book, token)
  )) as IBook;
};

export const deleteAllBooks = async (token: string) => {
  return (await axios(
    config("delete", "/books/deleteAll", [], token)
  )) as IBook[];
};
