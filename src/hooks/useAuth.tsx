import {useEffect, useCallback} from "react";
import useSWR from "swr";
import useUser from "hooks/useUser";
import {TypeUser} from "types/userTypes";

export default function useAuth() {
  const { getSessionToken, updateJwt, updateUser } = useUser();
  const token = getSessionToken();
  const { data: user, mutate: mutateUser, error} = useSWR(() => {
    return token ? ["/users/me", token] : null;
  },{ refreshInterval: 15000});
  
  const isCheckAuth = token ? (!user && !error) : false;
  const isLoggedOut = token ? Boolean(error && error.message.includes("401")) : true;
  const isThereUser = Boolean(user);

  const removeSession = useCallback(() => {
    updateJwt(null);
    updateUser(null);
    return mutateUser(null, true);;
  },[mutateUser, updateJwt, updateUser]);

  const createSession = useCallback((session: { jwt: string; user: TypeUser; }) => {
    updateJwt(session.jwt);
    updateUser(session.user);
    return mutateUser(session, true);
  }, [mutateUser, updateJwt, updateUser]);

  const updateUserWithFetchUser = useCallback((newUser: TypeUser | null) => {
    updateUser(newUser);
    return null;
  },[updateUser])

  useEffect(function () {
    let mounted = true;
    if(mounted) {
      updateUserWithFetchUser(user);
    }
    return () => {
      mounted = false;
    }
  },[user, updateUserWithFetchUser]);

  return {
    createSession, removeSession,
    isThereUser, isLoggedOut, isCheckAuth
  };
}