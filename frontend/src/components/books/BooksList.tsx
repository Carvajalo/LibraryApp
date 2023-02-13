import React, { useEffect } from "react";
import { useContext } from "react";
import { BookContext } from "@contexts/Books/BooksContext";
import { IBook } from "@contexts/Books/IBook";
import Book from "./Book";
import "@components/listsStyles.css";

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
    <div>
      <div className="table__name">
        <div className="table__name__container">
          <div className="title table__title">
            <h1>Books List</h1>
          </div>
          <div className="table__actions">
            <button className="btn btn-primary">Add Book</button>
          </div>
        </div>
      </div>
      <table id="container">
        <thead className="table__container">
          <tr className="container__head">
            <th>Title</th>
          </tr>
          <tr className="container__head">
            <th>Author</th>
          </tr>
          <tr className="container__head">
            <th>ISBN</th>
          </tr>
          <tr className="container__head list__actions">
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="item__container" id="scrollbar">
          {books.map((book) => (
            <Book
              key={book._id}
              _id={book._id}
              title={book.title}
              author={book.author}
              ISBN={book.ISBN}
            ></Book>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
