import React, { ReactNode } from 'react'
import useLocalStorage from "hooks/useLocalStorage";
import { TypeUser } from "types/userTypes";

type TypeUserContext = {
  setUser: (user: TypeUser) => void;
  setJWT: (jwt: string | null) => void;
  user: TypeUser;
  jwt: string | null;
  version: string;
};

const Context = React.createContext<TypeUserContext | undefined>(undefined)


export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userLocalStorage] = useLocalStorage("user-context");

  const checkLocalUserBucket = () => {
    if (!userLocalStorage) return null;
    return userLocalStorage.user;
  }

  const CheckLocalJwtBucket = () => {
    if (!userLocalStorage) return null;
    return userLocalStorage.jwt;
  }

  const [user, setUser] = React.useState<TypeUser>(checkLocalUserBucket);
  const [jwt, setJWT] = React.useState<string | null>(CheckLocalJwtBucket);

  return <Context.Provider value={{
    user,
    jwt,
    setJWT,
    setUser,
    version: process.env.CLIENT_VERSION || "v1.0"
  }}>
    {children}
  </Context.Provider>
}


export default Context