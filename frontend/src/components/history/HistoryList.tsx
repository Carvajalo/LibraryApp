import "@components/listsStyles.css";
import React, { useEffect } from "react";
import { useContext } from "react";
import { RequestContext } from "@contexts/Requests/RequestsContext";
import { IHistory, IUserHistory } from "@contexts/Requests/IHistory";
import History from "./History";
import { UserContext } from "@contexts/Users/UserContext";
import { getToken } from "@utils/jwt-helpers";

const historyList = () => {
  const {
    history,
    setHistory,
    change,
    requestRoutes,
    userHistory,
    setUserHistory,
  } = useContext(RequestContext);
  const { setToken, token } = useContext(UserContext);
  let style = "";

  const getHistory = async () => {
    const user = getToken();
    setToken(user);
    if (user.role == "admin") {
      const history = (await requestRoutes.getHistory()) as IHistory[];
      console.log(history);
      setUserHistory([]);
      return setHistory(history);
    }
    const history = (await requestRoutes.userHistory(
      user.token
    )) as IUserHistory[];
    console.log(history);
    setHistory([]);
    return setUserHistory(history);
  };

  useEffect(() => {
    getHistory();
  }, [change]);

  return (
    <div>
      <div className="table__name">
        <div className="table__name__container">
          <div className="table__title">
            <h1>History</h1>
          </div>
        </div>
      </div>
      <table id="container">
        <thead className="table__container">
          <tr className="container__head">
            <th>Book</th>
          </tr>
          <tr className="container__head">
            <th>User</th>
          </tr>
          <tr className="container__head">
            <th>Status</th>
          </tr>
          <tr className="container__head list__actions">
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="item__container" id="scrollbar">
          {history.map((h) => (
            <History
              key={h._id}
              book={h.book.title}
              user={h.user.name}
              status={h.status}
              _id={h._id}
            ></History>
          ))}
          {userHistory.map((h) => (
            <History
              key={h._id}
              book={h.title}
              author={h.author}
              status={h.returnDate}
              _id={h._id}
            ></History>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default historyList;
