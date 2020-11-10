import React, { ReactNode, Dispatch } from "react";
import useStickyState from "hooks/useStickyState";
import { TypeUser } from "types/userTypes";

export const TokenContext = React.createContext<string | null>(null);

export const TokenActionContext = React.createContext<Dispatch<any>>(() => null);

export const UserContext = React.createContext<TypeUser>(null);

export const UserActionsContext = React.createContext<Dispatch<TypeUser>>(() => null);

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [jwt, updateToken] = useStickyState(null, "_jwt_");
  const [user, updateUser] = React.useState<TypeUser>(null);

  return (
    <TokenActionContext.Provider value={updateToken}>
      <UserActionsContext.Provider value={updateUser}>
        <TokenContext.Provider value={jwt} >
          <UserContext.Provider value={user}>
            {children}
          </UserContext.Provider>
        </TokenContext.Provider>
      </UserActionsContext.Provider>
    </TokenActionContext.Provider>
  );
}