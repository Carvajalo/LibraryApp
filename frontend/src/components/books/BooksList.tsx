import React, { useEffect } from "react";
import { useContext } from "react";
import { BookContext } from "../../context/Books/BooksContext";
import { IBook } from "../../context/Books/IBook";
import Book from "./Book";
import "./bookStyles.css";

const BooksList = () => {
  const { books, booksRoutes, setBooks, change } = useContext(BookContext);

  const getBooks = async () => {
    const books = (await booksRoutes.getAllBooks()) as IBook[];
    setBooks(books);
  };

  useEffect(() => {
    getBooks();
  }, [change]);

  return (
    <>
      <h1>Books List</h1>
      <div className="grid__container">
        {books.map((book) => (
          <Book
            key={book._id}
            title={book.title}
            author={book.author}
            ISBN={book.ISBN}
          ></Book>
        ))}
      </div>
    </>
  );
};

export default BooksList;
