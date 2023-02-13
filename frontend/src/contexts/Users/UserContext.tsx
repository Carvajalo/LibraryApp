import { createContext, useState } from "react";
import { TProps } from "../TProps";
import { IUser } from "./IUser";
import * as userRoutes from "./userRoutes";
import { IJwt } from "./loginRoutes";

interface UserContextProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[] | []>>;
  userRoutes: typeof userRoutes;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  token: IJwt;
  setToken: React.Dispatch<React.SetStateAction<IJwt>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as UserContextProps);

export const UsersContextProvider = ({ children }: TProps) => {
  const [users, setUsers] = useState([] as IUser[]);
  const [change, setChange] = useState(false);
  const [token, setToken] = useState({} as IJwt);
  const [role, setRole] = useState("");

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        change,
        setChange,
        userRoutes,
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
