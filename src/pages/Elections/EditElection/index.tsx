import React, { useState, memo, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CSVReader } from "react-papaparse";
import Breadcrumbs from "components/Breadcrums";
import Tabs from "components/Tabs";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";
import Card from "components/Card";
import CreateCampaign from "pages/Elections/CreateCampaign";
import InputFetch from "components/InputFetch";
import ContentLoader from "components/ContentLoader";
import AddIcon from "icons/AddIcon";
import useElection from "hooks/useElection";
// import { TypeElection } from "types/appTypes";
import "./index.css";

const tabs = [
  { id: "campaigns", name: "Partidos" },
  { id: "votantes", name: "Votantes" },
  { id: "tags", name: "Etiquetas" },
  { id: "candidates", name: "Candidatos" }
];

type PropsEditElection = RouteComponentProps<{ id: string }> & {};

export default memo(function EditElection(props: PropsEditElection) {
  const currentElectionId = useMemo(() => props.match.params.id, [props.match]);
  const { getParsedObj, election, api, isFetching, isFetchError, removeElection, updateElection } = useElection(currentElectionId);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOpenCreateCampaign, setIsOpenCreateCampaign] = useState<boolean>(false);

  const breadcrumbs = useMemo(
    () => [
      { name: "Elecciones", pathname: "/elections" },
      { name: election ? election.name : "...", pathname: `/elections/${election ? election.name : ""}` }
    ],
    [election]
  );

  const campaigns = useMemo(() => getParsedObj("campaigns"), [getParsedObj]);
  // const candidates = useMemo(() => getParsedObj("candidates"), [getParsedObj]);
  // const voters = useMemo(() => getParsedObj("voters"), [getParsedObj]);
  // const tags = useMemo(() => getParsedObj("tags"), [getParsedObj]);
  console.log({ election, campaigns });

  return (
    <>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      <RenderIf isTrue={isOpenCreateCampaign}>
        {election && (
          <CreateCampaign
            election={election}
            success={async val => {
              await updateElection(val);
              return setIsOpenCreateCampaign(false);
            }}
            cancel={() => setIsOpenCreateCampaign(false)}
          />
        )}
      </RenderIf>
      <RenderIf isTrue={!isOpenCreateCampaign}>
        <ContentLoader isFetching={isFetching} isError={isFetchError} isNoData={isFetching} contentScreen='elections' messageNoData='No existe'>
          <Tabs initialTab={selectedTab} onSelectTab={setSelectedTab} tabs={tabs}>
            <RenderIf isTrue={selectedTab === 0}>
              {election && campaigns && (
                <>
                  <div className='container-election-name breadcrumbs-with-button'>
                    <InputFetch
                      initialValue={election.name}
                      beforeChange={async data => {
                        return await api.mutate(data, false);
                      }}
                      onChange={updateElection}
                      resolveData={val => ({ ...election, name: val })}
                    />
                    <button onClick={() => setIsOpenCreateCampaign(true)} className='btn-right-breadcrumb'>
                      <AddIcon />
                      Agregar partido
                    </button>
                  </div>
                  <div className='elections-tabs-view-section'>
                    {campaigns.map((campaign, index) => {
                      return (
                        <Card
                          key={index}
                          id={index}
                          title={campaign.name}
                          content={campaign.commitments_text}
                          onClick={() => {}}
                          onDelete={async id => {
                            return await updateElection({ ...election, campaigns: election.campaigns.filter(campaign => campaign[0] !== id) }); // campaign.id
                          }}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </RenderIf>
            <RenderIf isTrue={selectedTab === 1}>
              <div className='breadcrumbs-with-button'>
                <button onClick={() => setIsOpenCreateCampaign(true)} className='btn-right-breadcrumb'>
                  <AddIcon />
                  Agregar Etiquetas
                </button>
                <CSVReader
                  noDrag
                  addRemoveButton
                  onDrop={data => {
                    return data.map(({ data }: { data: any[] }) => ({
                      name: data[0] || "",
                      email: data[1] || ""
                    }));
                  }}>
                  <span>Subir lista estudiantes.</span>
                </CSVReader>
              </div>
              <div className='elections-tabs-view-section'>
                <p>Votantes</p>
              </div>
            </RenderIf>
          </Tabs>
          <div className='rainbow-m-top_xx-large rainbow-align-content_center rainbow-flex_wrap'>
            <Button label='Borrar Elección' onClick={() => removeElection(path => props.history.push(path))} variant='destructive' className='rainbow-m-horizontal_medium' />
          </div>
        </ContentLoader>
      </RenderIf>
    </>
  );
});
