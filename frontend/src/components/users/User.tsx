import React from "react";
import { IUserProps } from "../../contexts/Users/IUser";

const User = ({ name, email, role, _id }: IUserProps) => {
  return (
    <tr className="list__item">
      <td>
        <h3>{name}</h3>
      </td>
      <td>
        <p>{email}</p>
      </td>
      <td>
        <p>{role}</p>
      </td>
      <td>
        <button className="btn btn-secondary">Delete</button>
        <button className="btn btn-secondary">Update</button>
      </td>
    </tr>
  );
};

export default User;
