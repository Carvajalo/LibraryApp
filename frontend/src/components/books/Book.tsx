import React from "react";
import { IBookProps } from "../../context/Books/IBook";

const Book = ({ title, author, ISBN }: IBookProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{ISBN}</p>
    </div>
  );
};

export default Book;
