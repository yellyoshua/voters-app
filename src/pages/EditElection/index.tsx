import React, { useState, memo, useMemo, useEffect, useContext, Suspense } from "react";
import { RouteComponentProps } from "react-router-dom";
import loadable from "@loadable/component";
import SpinnerCentered from "components/SpinnerCentered";
import useTitle from "react-use/lib/useTitle";
import { useAsyncFn } from "react-use";
import useFetch from "hooks/useFetch";
import TheElectionProvider from "context/TheElectionContext";
import { TokenContext } from "context/UserContext";
import Breadcrumbs from "components/Breadcrums";
import Tabs from "components/Tabs";
import ContentLoader from "components/ContentLoader";
import RenderIf from "react-rainbow-components/components/RenderIf";
// import TabSettings from "pages/EditElection/TabSettings";
// import TabVoters from "pages/EditElection/TabVoters";
// import TabCandidates from "pages/EditElection/TabCandidates";
// import TabCampaigns from "pages/EditElection/TabCampaigns";
// import TabGeneral from "pages/EditElection/TabGeneral";
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

  const [asyncFetch, execAsyncFetch] = useAsyncFn(async () => {
    return fetchGetWithToken(`/elections/${currentElectionId}`, token || "")
      .then(data => {
        const election = resolveValueType<TypeElection>(data, "object") as TypeElection | null;
        return election;
      }).then(setElection)
      .catch(() => setIsFetchError(new Error("Elección no encontrada")));
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      execAsyncFetch();
    }
    return () => {
      mounted = false;
    }
  }, [execAsyncFetch]);

  useTitle(election ? election.name : ". . .");

  const breadcrumbs = useMemo(
    () => [
      { name: "Elecciones", pathname: "/elections" },
      { name: election ? election.name : "...", pathname: `/elections/${currentElectionId}` }
    ],
    [election, currentElectionId]
  );

  const isActiveElection = election ? election.status === "active" : false;

  if (!election) {
    return <ContentLoader contentScreen='elections' isError={isFetchError} isFetching={asyncFetch.loading} isNoData={false} />;
  } else if (Object.keys(election).length === 0) {
    return <ContentLoader contentScreen='elections' isError={null} isFetching={false} isNoData={true} />;
  }

  return (
    <TheElectionProvider id={currentElectionId} value={election}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <ContentLoader messageNoData='No existe' contentScreen='elections' isError={isFetchError} isFetching={asyncFetch.loading} isNoData={Boolean(Object.keys(election).length <= 0)}>
        {
          <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
            <Suspense fallback={<SpinnerCentered size="large" />}>
              <RenderIf isTrue={selectedTab === 0}>
                <TabGeneral />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 1 && !isActiveElection}>
                <TabCampaigns />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 2 && !isActiveElection}>
                <TabVoters />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 3 && !isActiveElection}>
                <TabCandidates />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 4}>
                <TabSettings />
              </RenderIf>
              <RenderIf isTrue={selectedTab !== 4 && selectedTab !== 0 && isActiveElection}>
                <p>Desactivado durante las elecciones</p>
              </RenderIf>
            </Suspense>
          </Tabs>
        }
      </ContentLoader>
    </TheElectionProvider >
  );
});
