import React, { useState, memo, useMemo, useCallback } from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";
import Tabs from "components/Tabs";
import ContentLoader from "components/ContentLoader";
import ModalCreateCampaign from "components/Modals/ModalCreateCampaign";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";
import TabSettings from "pages/EditElection/TabSettings";
import TabVoters from "pages/EditElection/TabVoters";
import TabCandidates from "pages/EditElection/TabCandidates";
import TabCampaigns from "pages/EditElection/TabCampaigns";
import TabGeneral from "pages/EditElection/TabGeneral";
import useElection from "hooks/useElection";
import TheElectionProvider from "context/TheElectionContext";
import { resolveValueType } from "utils/properTypes";
import { TypeElection, TypeElectionFunc } from "types/electionTypes";
import "./index.css";

const tabs = [
  { id: "general", name: "General" },
  { id: "campaigns", name: "Partidos" },
  { id: "votantes", name: "Votantes" },
  { id: "candidates", name: "Candidatos" },
  { id: "configs", name: "Configuraciones" }
];

type PropsEditElection = RouteComponentProps<{ id: string }> & {};

export default memo(function EditElection({ match, staticContext, location, history }: PropsEditElection) {
  const currentElectionId = useMemo(() => match.params.id, [match]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOpenCreateCampaign, openCampaignModal] = useState<boolean>(false);
  const [editableCampaign, setEditableCampaign] = useState<string | null>(null);

  const { apiRemove, apiUpdate, isFetching, isFetchError, data, api } = useElection({ id: currentElectionId });

  const election = resolveValueType<TypeElection>(data, "object") as TypeElection | null;

  useTitle(election ? election.name : ". . .");

  const breadcrumbs = useMemo(
    () => [
      { name: "Elecciones", pathname: "/elections" },
      { name: election ? election.name : "...", pathname: `/elections/${currentElectionId}` }
    ],
    [election, currentElectionId]
  );

  const updateElection = useCallback(async (newElection: TypeElectionFunc) => {
    await apiUpdate({ ...election, ...newElection });
  }, [apiUpdate, election]);
  const isActiveElection = election ? election.status === "active" : false;

  if (!election) {
    return <ContentLoader contentScreen='elections' isError={isFetchError} isFetching={isFetching} isNoData={false} />;
  } else if (Object.keys(election).length === 0) {
    return <ContentLoader contentScreen='elections' isError={null} isFetching={false} isNoData={true} />;
  }

  return (
    <TheElectionProvider id={currentElectionId} mutate={api.mutate} value={election}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <ModalCreateCampaign
        isOpen={isOpenCreateCampaign}
        slug={editableCampaign}
        createOrUpdate={updateElection}
        cancel={() => {
          setEditableCampaign(null);
          return openCampaignModal(false);
        }}
      />
      <RenderIf isTrue={!isOpenCreateCampaign}>
        <ContentLoader messageNoData='No existe' contentScreen='elections' isError={isFetchError} isFetching={isFetching} isNoData={Boolean(Object.keys(election).length <= 0)}>
          {
            <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
              <RenderIf isTrue={selectedTab === 0}>
                <TabGeneral updateElection={updateElection} />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 1 && !isActiveElection}>
                <TabCampaigns
                  updateElection={updateElection}
                  editCampaign={slug => {
                    setEditableCampaign(slug);
                    return openCampaignModal(true);
                  }}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 2 && !isActiveElection}>
                <TabVoters updateElection={updateElection} />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 3 && !isActiveElection}>
                <TabCandidates />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 4}>
                <TabSettings updateElection={updateElection} />
              </RenderIf>
              <RenderIf isTrue={selectedTab !== 4 && selectedTab !== 0 && isActiveElection}>
                <p>Desactivado durante las elecciones</p>
              </RenderIf>
            </Tabs>
          }
          <div className='rainbow-m-top_xx-large rainbow-align-content_center rainbow-flex_wrap'>
            <Button
              variant='destructive'
              label='Borrar Elección'
              disabled={isActiveElection}
              className='rainbow-m-horizontal_medium'
              onClick={() => apiRemove(null, () => history.push("/elections"))}
            />
          </div>
        </ContentLoader>
      </RenderIf>
    </TheElectionProvider >
  );
});
