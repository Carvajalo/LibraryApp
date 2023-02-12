import React from "react";
import { createContext, useState } from "react";
import { TProps } from "../TProps";
import { IRequests } from "./IRequest";
import * as requestRoutes from "./requestsRoutes";

interface RequestContextProps {
  request: IRequests[];
  setRequest: React.Dispatch<React.SetStateAction<IRequests[] | []>>;
  requestRoutes: typeof requestRoutes;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestContext = createContext({} as RequestContextProps);



export const RequestContextProvider = ({ children }: TProps) => {
  const [request, setRequest] = useState([] as IRequests[]);
  const [change, setChange] = useState(false);
  return (
    <RequestContext.Provider
      value={{ request, setRequest, requestRoutes, change, setChange }}
    >
      {children}
    </RequestContext.Provider>
  );
};
