import React, { ReactNode, useCallback, useContext, useState } from "react";
import useFetch from "hooks/useFetch";
import { TypeElection, TypeElectionFunc } from "types/electionTypes";
import useAsyncFn, { AsyncFnReturn } from "react-use/lib/useAsyncFn";
import { TokenContext } from "./UserContext";

export type MutateProperties<T> = (data: T, shouldRevalidate?: boolean) => void | Promise<any>;

export type TypeAsyncUpdate = AsyncFnReturn<(newElection: TypeElectionFunc, done: () => any) => Promise<any>>;

const { fetchPutWithToken } = useFetch();

export const TheElectionMutateContext = React.createContext<MutateProperties<TypeElection> | null>(null);

export const TheElectionContext = React.createContext<TypeElection | null>(null);

export const TheUpdateElectionContext = React.createContext<TypeAsyncUpdate | null>(null);

export const TheElectionIdContext = React.createContext<any>(null);

export default function TheElectionContextProvider(
  { children, id: TheElectionId, value: TheElectionValue, mutate: TheElectionMutate }:
    { id: any; value: TypeElection; children: ReactNode; mutate?: MutateProperties<TypeElection>; }
) {
  const token = useContext(TokenContext);
  const [election, setElection] = useState<TypeElection>(() => TheElectionValue);

  const mutateElection = useCallback((data: TypeElectionFunc, shouldRevalidate?: boolean) => {
    return setElection({ ...election, ...data });
  }, [election, setElection]);

  const updateAsync = useAsyncFn(async (newElection: TypeElectionFunc, done: () => any) => {
    try {
      const ele = { ...election, ...newElection };
      await fetchPutWithToken(`/elections/${TheElectionId}`, token, ele);
      setElection(ele);
      return done();
    } catch (error) {
      console.log({ error });
    }
  }, [election]);

  return (
    <TheElectionIdContext.Provider value={TheElectionId}>
      <TheElectionContext.Provider value={election}>
        <TheUpdateElectionContext.Provider value={updateAsync}>
          <TheElectionMutateContext.Provider value={TheElectionMutate ? TheElectionMutate : mutateElection}>
            {children}
          </TheElectionMutateContext.Provider>
        </TheUpdateElectionContext.Provider>
      </TheElectionContext.Provider>
    </TheElectionIdContext.Provider>
  );
}