import { createContext, useState } from "react";
import { TProps } from "../TProps";
import { IUser } from "./IUser";
import * as userRoutes from "./userRoutes";

interface UserContextProps {
  user: IUser[];
  setUser: React.Dispatch<React.SetStateAction<IUser[]>>;
  userRoutes: typeof userRoutes;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: TProps) => {
  const [user, setUser] = useState([] as IUser[]);
  const [change, setChange] = useState(false);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, change, setChange, userRoutes, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
