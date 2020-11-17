import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import loadable from "@loadable/component";
import useFetch from "hooks/useFetch";
import Layout from "components/Layout";
import SpinnerCentered from "components/SpinnerCentered";
// import ScreenCredentials from "./ScreenCredentials";
// import ScreenElections from "./ScreenElections";
import { resolveValueType } from "utils/properTypes";
import { TypeElectionFunc } from "types/electionTypes";

const ScreenCredentials = loadable(() => import("./ScreenCredentials"));
const ScreenElections = loadable(() => import("./ScreenElections"));

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
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isError) {
    return <Redirect to="/votar" />
  }

  if (election && !isLoading) {
    return <Suspense fallback={<SpinnerCentered size="large" />}>
      <Layout breadcrumbs={[
        { name: "Votar", pathname: "/votar" },
        { name: election.name as string, pathname: `/votar?id=${election.id}` },
      ]}>
        <ScreenCredentials election={election} />
      </Layout>
    </Suspense>
  }

  if (elections && !isLoading) {
    return <Suspense fallback={<SpinnerCentered size="large" />}>
      <Layout breadcrumbs={[{ name: "Votar", pathname: "/votar" }]}>
        <ScreenElections elections={elections} />
      </Layout>
    </Suspense>
  }

  return <Layout breadcrumbs={[{ name: "Votar", pathname: "/votar" }]}>
    <SpinnerCentered size="large" />
  </Layout>
}