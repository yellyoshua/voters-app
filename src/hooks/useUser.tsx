import React, { useCallback } from "react";
import UserContext from "context/UserContext";
import useLocalStorage from "hooks/useLocalStorage";
import { TypeUser } from "types/userTypes";

export default function useUser() {
  const { setUser, user, jwt, setJWT } = React.useContext(UserContext)!;
  const [, setUserLocalStorage] = useLocalStorage("user-context");
  const [isThereUser, setIsThereUser] = React.useState<boolean>(false);

  const checkUserTokenWithCallback = useCallback((jwt: string | null, isThereUser: (val: boolean) => void) => {
    // Here check token
    return isThereUser(true);
  }, []);

  React.useEffect(function () {
    let mounted: boolean = true;

    if (mounted) {
      if (Boolean(user) && Boolean(jwt)) {
        setIsThereUser(true);
        checkUserTokenWithCallback(jwt, setIsThereUser);

      } else {
        setIsThereUser(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [user, checkUserTokenWithCallback, setIsThereUser, jwt]);


  const removeSession = () => {
    setUser(null);
    setJWT(null);
    return setUserLocalStorage(null);
  };

  const createSession = useCallback(({ jwt, user }: { jwt: string; user: TypeUser; }) => {
    setUser(user);
    setJWT(jwt);
    setUserLocalStorage({ jwt, user });
  }, [setJWT, setUser, setUserLocalStorage]);

  return { createSession, isThereUser, removeSession };
}