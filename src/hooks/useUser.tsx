import React, { useCallback } from "react";
import userGet from "api/private/userGet";
import UserContext from "context/UserContext";
import useLocalStorage from "hooks/useLocalStorage";
import { TypeUser } from "types/userTypes";

export default function useUser() {
  const { setUser, user, jwt, setJWT } = React.useContext(UserContext)!;
  const { fetchGetMe } = userGet(jwt);
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user-context");
  const [isThereUser, setIsThereUser] = React.useState<boolean>(false);

  const checkUserSession = fetchGetMe;

  React.useEffect(function () {
    let mounted: boolean = true;

    if (mounted) {
      if (Boolean(user) && Boolean(jwt)) {
        setIsThereUser(true);
      } else {
        setIsThereUser(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [user, setIsThereUser, jwt]);


  const removeSession = () => {
    setUser(null);
    setJWT(null);
    return setUserLocalStorage(null);
  };

  const getSessionToken = useCallback(() => {
    return userLocalStorage ? (userLocalStorage.jwt || null) : null;
  }, [userLocalStorage])

  const createSession = useCallback(({ jwt, user }: { jwt: string; user: TypeUser; }) => {
    setUser(user);
    setJWT(jwt);
    setUserLocalStorage({ jwt, user });
  }, [setJWT, setUser, setUserLocalStorage]);

  return { createSession, getSessionToken, checkUserSession, isThereUser, removeSession };
}