import React from "react";
import { createContext, useState } from "react";
import { TProps } from "../TProps";
import { IRequests } from "./IRequest";
import * as requestRoutes from "./requestsRoutes";
import { IHistory, IUserHistory } from "./IHistory";

interface RequestContextProps {
  request: IRequests[];
  setRequest: React.Dispatch<React.SetStateAction<IRequests[] | []>>;
  requestRoutes: typeof requestRoutes;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  history: IHistory[];
  setHistory: React.Dispatch<React.SetStateAction<IHistory[] | []>>;
  userHistory: IUserHistory[];
  setUserHistory: React.Dispatch<React.SetStateAction<IUserHistory[] | []>>;
}

export const RequestContext = createContext({} as RequestContextProps);

export const RequestContextProvider = ({ children }: TProps) => {
  const [request, setRequest] = useState([] as IRequests[]);
  const [change, setChange] = useState(false);
  const [history, setHistory] = useState([] as IHistory[]);
  const [userHistory, setUserHistory] = useState([] as IUserHistory[]);
  return (
    <RequestContext.Provider
      value={{
        request,
        setRequest,
        requestRoutes,
        change,
        setChange,
        history,
        setHistory,
        userHistory,
        setUserHistory,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
