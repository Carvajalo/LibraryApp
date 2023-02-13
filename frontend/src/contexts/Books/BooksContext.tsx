import React from "react";
import { createContext, useState, useContext } from "react";
import { IBook } from "./IBook";
import { TProps } from "../TProps";
import * as booksRoutes from "./bookRoutes";

interface BooksContextProps {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[] | []>>;
  booksRoutes: typeof booksRoutes;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BookContext = createContext({} as BooksContextProps);

export const BooksContextProvider = ({ children }: TProps) => {
  const [books, setBooks] = useState([] as IBook[]);
  const [change, setChange] = useState(false);
  return (
    <BookContext.Provider
      value={{ books, setBooks, booksRoutes, change, setChange }}
    >
      {children}
    </BookContext.Provider>
  );
};
