import { useCallback, useContext } from "react";
import UserContext from "context/UserContext";
import { TypeUser } from "types/userTypes";

export default function useUser() {
  const { jwt, setJWT, setUser } = useContext(UserContext)!;

  const getSessionToken = useCallback(() => {
    return jwt && jwt;
  }, [jwt]);

  const updateJwt = useCallback((jwt: string | null) => {
    setJWT(jwt);
    return jwt;
  },[setJWT]);
  
  const updateUser = useCallback((newUser: TypeUser | null) => {
    setUser(newUser);
    return newUser;
  },[setUser]);

  return { getSessionToken, updateJwt, updateUser };
}