import "@components/listsStyles.css";
import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "@contexts/Users/UserContext";
import { IUser } from "@contexts/Users/IUser";
import Request from "./User";

const UsersList = () => {
  const { users, setUsers, userRoutes, change, setChange, token } =
    useContext(UserContext);

  const getUsers = async () => {
    const users = (await userRoutes.getAllUsers(token.token)) as IUser[];
    setUsers(users);
  };
  useEffect(() => {
    getUsers();
  }, [change]);

  return (
    <div>
      <div className="table__name">
        <div className="table__name__container">
          <div className="table__title">
            <h1>Request List</h1>
          </div>
        </div>
      </div>
      <table id="container">
        <thead className="table__container">
          <tr className="container__head">
            <th>name</th>
          </tr>
          <tr className="container__head">
            <th>email</th>
          </tr>
          <tr className="container__head">
            <th>role</th>
          </tr>
          <tr className="container__head list__actions">
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="item__container" id="scrollbar">
          {users.map((user) => (
            <Request
              key={user._id}
              _id={user._id}
              name={user.name}
              email={user.email}
              role={user.role}
            ></Request>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
