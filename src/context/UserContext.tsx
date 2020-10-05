import React, { ReactNode, Dispatch } from "react";
import useStickyState from "hooks/useStickyState";
import { TypeUser } from "types/userTypes";

type TypeUserContext = {
  user: TypeUser;
  jwt: string | null;
  version: string;
  setJWT: Dispatch<any>;
  setUser: Dispatch<any>;
};

const Context = React.createContext<TypeUserContext | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [jwt, setJWT] = useStickyState(null, "_jwt_");
  const [user, setUser] = React.useState<TypeUser | null>(null);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        jwt,
        setJWT,
        version: process.env.CLIENT_VERSION || "v1.0"
      }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
