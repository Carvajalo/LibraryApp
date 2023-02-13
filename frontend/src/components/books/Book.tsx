import React, { useContext } from "react";
import { IBookProps } from "@contexts/Books/IBook";
import { BookContext } from "@/contexts/Books/BooksContext";
import { UserContext } from "@/contexts/Users/UserContext";

const Book = ({ title, author, ISBN, _id }: IBookProps) => {
  const { booksRoutes } = useContext(BookContext);
  const { token } = useContext(UserContext);

  const handleView = async () => {
    const book = await booksRoutes.getBookById(_id);
    console.log(book);
  };

  const handleDelete = async () => {
    await booksRoutes.deleteBook(_id, token.token);
  };

  return (
    <tr className="list__item">
      <td>
        <h3>{title}</h3>
      </td>
      <td>
        <p>{author}</p>
      </td>
      <td>
        <p>{ISBN}</p>
      </td>
      <td className="list__actions">
        <button className="btn btn-secondary" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-secondary" onClick={handleView}>
          View
        </button>
        <button className="btn btn-secondary">Request</button>
      </td>
    </tr>
  );
};

export default Book;
