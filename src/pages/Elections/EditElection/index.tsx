import React, { useState, memo, useMemo, useCallback } from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";
import Tabs from "components/Tabs";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";
import CreateCampaign from "pages/Elections/CreateCampaign";
import ContentLoader from "components/ContentLoader";
import TabSettings from "pages/Elections/EditElection/TabSettings";
import TabVoters from "pages/Elections/EditElection/TabVoters";
import TabCandidates from "pages/Elections/EditElection/TabCandidates";
import TabCampaigns from "pages/Elections/EditElection/TabCampaigns";
import TabGeneral from "pages/Elections/EditElection/TabGeneral";
import useElection, { PropsUseElection } from "hooks/useElection";
// import { TypeElection } from "types/appTypes";
import "./index.css";

const tabs = [
  { id: "general", name: "General" },
  { id: "campaigns", name: "Partidos" },
  { id: "votantes", name: "Votantes" },
  { id: "candidates", name: "Candidatos" },
  { id: "configs", name: "Configuraciones" }
];

const confApi = (id: string): PropsUseElection => {
  return {
    dataType: "object",
    dataUrl: `/elections/${id}`,
    createUrl: `/elections/${id}`,
    removeUrl: `/elections/${id}`,
    updateUrl: `/elections/${id}`
  }
}

type PropsEditElection = RouteComponentProps<{ id: string }> & {};

export default memo(function EditElection(props: PropsEditElection) {
  const currentElectionId = useMemo(() => props.match.params.id, [props.match]);
  const {
    getParsedObj,
    getValuesField,
    apiRemove,
    apiUpdate,
    isFetching,
    isFetchError,
    data: election,
    api,
  } = useElection(confApi(currentElectionId));

  useTitle(election ? election.name : "...");

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOpenCreateCampaign, createCampaign] = useState<{ [key: string]: any } | null>(null);

  const breadcrumbs = useMemo(
    () => [
      { name: "Elecciones", pathname: "/elections" },
      { name: election ? election.name : "...", pathname: `/elections/${currentElectionId}` }
    ],
    [election, currentElectionId]
  );

  const updateElection = useCallback(async (data: { [key: string]: any }) => {
    return await apiUpdate({ ...election, ...data });
  }, [apiUpdate, election]);

  const deleteElection = useCallback(async () => {
    if (election ? election.status === "active" : false) {
      return props.history.push("/elections");
    }
    return await apiRemove(null, () => props.history.push("/elections"));
  }, [apiRemove, election, props.history]);

  const campaigns = useMemo(() => getParsedObj("campaigns"), [getParsedObj]);
  const candidates = useMemo(() => getParsedObj("candidates"), [getParsedObj]);
  const voters = useMemo(() => getParsedObj("voters"), [getParsedObj]);
  const tags = useMemo(() => getParsedObj("tags"), [getParsedObj]);

  const campaignsSlugs = useMemo(() => getValuesField("campaigns", "slug"), [getValuesField]);
  const campaignsNames = useMemo(() => getValuesField("campaigns", "name"), [getValuesField]);

  const isActiveElection = useMemo(() => election ? election.status === "active" : false, [election])

  return (
    <>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      <RenderIf isTrue={Boolean(isOpenCreateCampaign)}>
        {campaigns && (
          <CreateCampaign
            campaigns={campaigns}
            campaign={isOpenCreateCampaign as { [key: string]: any }}
            createOrUpdate={async val => {
              await apiUpdate(Object.assign(election, val));
              return createCampaign(null);
            }}
            cancel={() => createCampaign(null)}
          />
        )}
      </RenderIf>
      <RenderIf isTrue={!Boolean(isOpenCreateCampaign)}>
        <ContentLoader
          messageNoData='No existe'
          contentScreen='elections'
          isError={isFetchError}
          isFetching={isFetching}
          isNoData={election && Boolean(Object.keys(election).length <= 0)}
        >
          {election && (
            <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
              <RenderIf isTrue={selectedTab === 0}>
                <TabGeneral
                  tags={tags}
                  voters={voters}
                  campaigns={campaigns}
                  candidates={candidates}
                  apiMutate={api.mutate}
                  nameElection={election.name}
                  updateElection={updateElection}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 1 && !isActiveElection}>
                <TabCampaigns
                  election={election}
                  campaigns={campaigns}
                  candidates={candidates}
                  apiMutate={api.mutate}
                  removeElection={deleteElection}
                  updateElection={updateElection}
                  screenCampaign={createCampaign}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 2 && !isActiveElection}>
                <TabVoters
                  tags={tags}
                  voters={voters}
                  election={election}
                  apiMutate={api.mutate}
                  updateElection={updateElection}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 3 && !isActiveElection}>
                <TabCandidates
                  campaignsSlugs={campaignsSlugs}
                  campaignsNames={campaignsNames}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab === 4}>
                <TabSettings
                  election={election}
                  updateElection={updateElection}
                />
              </RenderIf>
              <RenderIf isTrue={selectedTab !== 4 && selectedTab !== 0 && isActiveElection}>
                <p>Desactivado durante las elecciones</p>
              </RenderIf>
            </Tabs>
          )}
          <div className='rainbow-m-top_xx-large rainbow-align-content_center rainbow-flex_wrap'>
            <Button label='Borrar Elección' onClick={() => apiRemove(null, () => props.history.push("/elections"))} variant='destructive' className='rainbow-m-horizontal_medium' />
          </div>
        </ContentLoader>
      </RenderIf>
    </>
  );
});
