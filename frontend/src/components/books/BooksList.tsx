import React, { useEffect } from "react";
import { useContext } from "react";
import { BookContext } from "../../context/Books/BooksContext";

const BooksList = () => {
  const { books, booksRoutes, setBooks, change } = useContext(BookContext);

  const getBooks = async () => {
    const books = await booksRoutes.getAllBooks();
    setBooks(books);
  };

  useEffect(() => {
    getBooks();
  }, [change]);

  return (
    <>
      <h1>Books List</h1>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </>
  );
};

export default BooksList;
