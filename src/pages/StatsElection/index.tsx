import React, { useMemo, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import TabStatsPerTag from "pages/StatsElection/TabStatsPerTag";
import { resolveValueType } from "utils/properTypes";
import { useTitle } from "react-use";
import { TypeElection } from "types/electionTypes";
import useFetch from "hooks/useFetch";
import Tabs from "components/Tabs";
import Breadcrumbs from "components/Breadcrums";
import RenderIf from "react-rainbow-components/components/RenderIf";
import TheElectionProvider from "context/TheElectionContext";
import TabStatsGeneral from "./TabStatsGeneral";

const tabs = [
  { id: "gen_stats", name: "Estadisticas Generales" },
  { id: "tags_stats", name: "Estadisticas por Etiquetas" },
];

type PropsStatsElection = RouteComponentProps<{ id: string }> & {
  isPrivate: boolean;
};

export default function StatsElectionContainer(isPrivate: boolean) {
  return (props: RouteComponentProps<{ id: string }>) => {
    return <StatsElection {...props} isPrivate={isPrivate} />
  }
}

const { fetchGetWithoutToken } = useFetch();

export function StatsElection({ isPrivate, match }: PropsStatsElection) {
  const currentElectionId = useMemo(() => match.params.id, [match]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [election, setElection] = useState<TypeElection | null>(null);

  useEffect(() => {
    fetchGetWithoutToken(`/elections/${currentElectionId}`)
      .then((data) => {
        const election = resolveValueType<TypeElection>(data, "object") as TypeElection | null;
        return election;
      }).then(setElection)
  }, [currentElectionId]);

  useTitle(election ? election.name : ". . .");

  const breadcrumbs = useMemo(() => [
    { name: "Elecciones", pathname: "/elections" },
    { name: election ? election.name : "...", pathname: `/elections/${currentElectionId}` }
  ], [election, currentElectionId]);

  if (!election) {
    return <Breadcrumbs breadcrumbs={breadcrumbs} />;
  }

  console.log({ election });

  return <TheElectionProvider id={currentElectionId} value={election}>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
      <RenderIf isTrue={selectedTab === 0}>
        <TabStatsGeneral isPrivate={isPrivate} />
      </RenderIf>
      <RenderIf isTrue={selectedTab === 1}>
        <TabStatsPerTag isPrivate={isPrivate} />
      </RenderIf>
    </Tabs>
  </TheElectionProvider>
}