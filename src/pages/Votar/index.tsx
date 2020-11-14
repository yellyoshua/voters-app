import React, { useEffect, useMemo, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import Layout from "components/Layout";
import useFetch from "hooks/useFetch";
import { TypeElectionFunc } from "types/electionTypes";
import { resolveValueType } from "utils/properTypes";
import ScreenCredentials from "./ScreenCredentials";
import ScreenElections from "./ScreenElections";

type PropsVotar = RouteComponentProps & {};

const { fetchGetWithoutToken } = useFetch();
export default function Votar({ location }: PropsVotar) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);
  const [election, setElection] = useState<TypeElectionFunc | null>(null);
  const [elections, setElections] = useState<TypeElectionFunc[] | null>(null);

  const id = useMemo(() => new URLSearchParams(location.search).get('id'), [location]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchGetWithoutToken(`/elections/public/${id}`)
        .then((data) => {
          const election = resolveValueType<TypeElectionFunc>(data, "object") as TypeElectionFunc | null;
          return election;
        })
        .then(setElection)
        .catch(setIsError)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setIsLoading(true);
      setElection(null);
      fetchGetWithoutToken("/elections/public")
        .then((data) => {
          const elections = resolveValueType<TypeElectionFunc[]>(data, "object") as TypeElectionFunc[] | null;
          return elections || [];
        })
        .then(setElections)
        // .catch(() => {
        //   setIsLoading(false);
        // })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  // Resolve it!!! ->

  if (isError) {
    return <Redirect to="/votar" />
  }

  if (election && !isLoading) {
    return <Layout breadcrumbs={[
      { name: "Votar", pathname: "/votar" },
      { name: election.name as string, pathname: `/votar?id=${election.id}` },
    ]}>
      <ScreenCredentials election={election} />
    </Layout>
  }

  if (elections && !isLoading) {
    return <Layout breadcrumbs={[{ name: "Votar", pathname: "/votar" }]}>
      <ScreenElections elections={elections} />
    </Layout>
  }

  return <Layout breadcrumbs={[{ name: "Votar", pathname: "/votar" }]}>
    <p>Cargando</p>
  </Layout>
}