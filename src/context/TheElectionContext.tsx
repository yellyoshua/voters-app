import React, { ReactNode, useCallback, useContext } from "react";
import { TypeElection, TypeElectionFunc } from "types/electionTypes";

type MutateProperties = (data: any, shouldRevalidate?: boolean | undefined) => Promise<any>;

export const useTheElection = () => {
  const theElection = useContext(TheElectionContext) as TypeElection;
  const mutate = useContext(TheElectionMutateContext) as MutateProperties;

  const mutateTheElectionWith = useCallback(mutate, []);

  return { theElection, mutateTheElectionWith };
}

export const TheElectionMutateContext = React.createContext<MutateProperties | null>(null);

export const TheElectionContext = React.createContext<TypeElectionFunc | null>(null);

export const TheElectionIdContext = React.createContext<any>(null);

export default function TheElectionContextProvider(
  { children, id: TheElectionId, value: TheElectionValue, mutate: TheElectionMutate }:
    { id: any; value: TypeElectionFunc; children: ReactNode; mutate?: MutateProperties; }
) {

  return (
    <TheElectionIdContext.Provider value={TheElectionId}>
      <TheElectionContext.Provider value={TheElectionValue}>
        <TheElectionMutateContext.Provider value={TheElectionMutate ? TheElectionMutate : null}>
          {children}
        </TheElectionMutateContext.Provider>
      </TheElectionContext.Provider>
    </TheElectionIdContext.Provider>
  );
}