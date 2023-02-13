import React from "react";
import { IRequestsProps } from "../../contexts/Requests/IRequest";

const Requests = ({ user, book, status, _id }: IRequestsProps) => {
  return (
    <tr className="list__item">
      <td>
        <h3>{user}</h3>
      </td>
      <td>
        <p>{book}</p>
      </td>
      <td>
        <p>{status}</p>
      </td>
      <td>
        <button className="btn btn-secondary">Borrow</button>
      </td>
    </tr>
  );
};

export default Requests;
