import { useEffect, useCallback, useMemo, useContext } from "react";
import useSWR from "swr";
import { TokenContext, TokenActionContext, UserActionsContext } from "context/UserContext";
import { TypeUser } from "types/userTypes";

export default function useAuth() {
  const token = useContext(TokenContext);
  const updateToken = useContext(TokenActionContext);
  const updateUser = useContext(UserActionsContext);

  const { data: user, mutate: mutateUser, error } = useSWR(() => {
    return token ? ["/users/me", token] : null;
  }, { refreshInterval: 15000 });

  const isCheckAuth = useMemo(() => token ? (!user && !error) : false, [user, error, token]);
  const isLoggedOut = useMemo(() => token ? Boolean(error && error.message.includes("401")) : true, [error, token]);
  const isThereUser = useMemo(() => Boolean(user), [user]);

  const removeSession = useCallback(() => {
    updateToken(null);
    updateUser(null);
    return mutateUser(null, true);;
  }, [mutateUser, updateToken, updateUser]);

  const createSession = useCallback((session: { jwt: string; user: TypeUser; }) => {
    updateToken(session.jwt);
    updateUser(session.user);
    return mutateUser(session, true);
  }, [mutateUser, updateToken, updateUser]);

  const updateUserWithFetchUser = useCallback((newUser: TypeUser | null) => {
    updateUser(newUser);
    return null;
  }, [updateUser])

  useEffect(function () {
    let mounted = true;
    if (mounted) {
      if (error) {
        updateUserWithFetchUser(null);
      } else {
        updateUserWithFetchUser(user);
      }
    }
    return () => {
      mounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    createSession, removeSession,
    isThereUser, isLoggedOut, isCheckAuth
  };
}