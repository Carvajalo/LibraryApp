import "@components/listsStyles.css";
import React, { useEffect } from "react";
import { useContext } from "react";
import { RequestContext } from "@contexts/Requests/RequestsContext";
import { IRequests } from "@contexts/Requests/IRequest";
import Request from "./Request";

const RequestList = () => {
  const { request, setRequest, requestRoutes, change, setChange } =
    useContext(RequestContext);

  const getRequests = async () => {
    const requests = (await requestRoutes.getAllRequests()) as IRequests[];
    // console.log(requests);
    setRequest(requests);
  };

  useEffect(() => {
    getRequests();
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
            <th>User</th>
          </tr>
          <tr className="container__head">
            <th>Book</th>
          </tr>
          <tr className="container__head">
            <th>Status</th>
          </tr>
          <tr className="container__head list__actions">
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="item__container" id="scrollbar">
          {request.map((req) => (
            <Request
              key={req._id}
              user={req.user.name}
              book={req.book.title}
              status={req.status}
              _id={req._id}
            ></Request>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
