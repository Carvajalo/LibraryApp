import React from "react";
import { createContext, useState, useContext } from "react";
import { IBook } from "../../components/books/IBook";

interface BooksContextProps {
  book: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[] | []>>;
}

export const BookContext = createContext({} as BooksContextProps);

export const Bookprovider = ({ children }: any) => {
  const book = useBookProvider();
  return <BookContext.Provider value={book}>{children}</BookContext.Provider>;
};

export const useBook = () => useContext(BookContext);

export const useBookProvider = () => {
  const [book, setBooks] = useState([] as IBook[]);
  return { book, setBooks };
};
