import React from "react";
import { IHistoryProps } from "../../contexts/Requests/IHistory";

const History = ({ _id, user, book, status, author }: IHistoryProps) => {
  return (
    <tr className="list__item">
      <td>
        <p>{book}</p>
      </td>
      <td>
        <h3>{user ? user : author}</h3>
      </td>
      <td>
        <p>{status == null ? "Not returned" : status}</p>
      </td>
      <td>
        <button className="btn btn-secondary">View</button>
      </td>
    </tr>
  );
};

export default History;
