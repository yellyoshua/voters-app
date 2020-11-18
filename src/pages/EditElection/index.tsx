import React, { useState, memo, useMemo, useEffect, useContext, Suspense, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import loadable from "@loadable/component";
import SpinnerCentered from "components/SpinnerCentered";
import useTitle from "react-use/lib/useTitle";
import useAsyncFn from "react-use/lib/useAsyncFn";
import useFetch from "hooks/useFetch";
import TheElectionProvider, { TheElectionContext } from "context/TheElectionContext";
import { TokenContext } from "context/UserContext";
import Breadcrumbs from "components/Breadcrums";
import Tabs from "components/Tabs";
import Spinner from "react-rainbow-components/components/Spinner";
import ContentLoader from "components/ContentLoader";
import RenderIf from "react-rainbow-components/components/RenderIf";
import _ from "underscore";
import { resolveValueType } from "utils/properTypes";
import { TypeElection } from "types/electionTypes";
import "./index.css";

const TabSettings = loadable(() => import("pages/EditElection/TabSettings"));
const TabVoters = loadable(() => import("pages/EditElection/TabVoters"));
const TabCandidates = loadable(() => import("pages/EditElection/TabCandidates"));
const TabCampaigns = loadable(() => import("pages/EditElection/TabCampaigns"));
const TabGeneral = loadable(() => import("pages/EditElection/TabGeneral"));

const tabs = [
  { id: "general", name: "General" },
  { id: "campaigns", name: "Partidos" },
  { id: "votantes", name: "Votantes" },
  { id: "candidates", name: "Candidatos" },
  { id: "configs", name: "Configuraciones" }
];

type PropsEditElection = RouteComponentProps<{ id: string }> & {};

const { fetchGetWithToken } = useFetch();
export default memo(function EditElection({ match }: PropsEditElection) {
  const token = useContext(TokenContext);
  const [election, setElection] = useState<TypeElection | null>(null);
  const [isFetchError, setIsFetchError] = useState<Error | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const currentElectionId = useMemo(() => match.params.id, [match]);

  const [, execAsyncFetch] = useAsyncFn(async () => {
    return fetchGetWithToken(`/elections/${currentElectionId}`, token || "")
      .then(data => {
        const election = resolveValueType<TypeElection>(data, "object") as TypeElection | null;
        return election;
      }).then(setElection)
      .catch(() => setIsFetchError(new Error("Elección no encontrada")));
  }, [token, currentElectionId]);

  useTitle(election ? election.name : ". . .");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      execAsyncFetch();
    }
    return () => {
      mounted = false;
    }
  }, [execAsyncFetch]);

  if (isFetchError) {
    return <p>Error al obtener los datos!</p>
  }


  if (!election) {
    return <SpinnerCentered size="large" />;
  } else if (_.isEmpty(election)) {
    return <ContentLoader contentScreen='elections' isError={null} isFetching={false} isNoData={true} />;
  }

  return (
    <TheElectionProvider id={currentElectionId} value={election}>
      <TheElectionContext.Consumer>
        {election => {
          const isActiveElection = election ? election.status === "active" : false;
          return <Fragment>
            <Breadcrumbs breadcrumbs={[
              { name: "Elecciones", pathname: "/elections" },
              { name: election ? election.name : "...", pathname: `/elections/${currentElectionId}` }
            ]} />
            <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
              <RenderIf isTrue={selectedTab === 0}>
                <Suspense fallback={<Spinner size="large" />}>
                  <TabGeneral />
                </Suspense>
              </RenderIf>
              <RenderIf isTrue={selectedTab === 1 && !isActiveElection}>
                <Suspense fallback={<Spinner size="large" />}>
                  <TabCampaigns />
                </Suspense>
              </RenderIf>
              <RenderIf isTrue={selectedTab === 2 && !isActiveElection}>
                <Suspense fallback={<Spinner size="large" />}>
                  <TabVoters />
                </Suspense>
              </RenderIf>
              <RenderIf isTrue={selectedTab === 3 && !isActiveElection}>
                <Suspense fallback={<Spinner size="large" />}>
                  <TabCandidates />
                </Suspense>
              </RenderIf>
              <RenderIf isTrue={selectedTab === 4}>
                <Suspense fallback={<Spinner size="large" />}>
                  <TabSettings />
                </Suspense>
              </RenderIf>
              <RenderIf isTrue={selectedTab !== 4 && selectedTab !== 0 && isActiveElection}>
                <p>Desactivado durante las elecciones</p>
              </RenderIf>
            </Tabs>
          </Fragment>
        }}
      </TheElectionContext.Consumer>
    </TheElectionProvider >
  );
});
