import React, { useState, Suspense, lazy } from "react";
import Button from "react-rainbow-components/components/Button";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Spinner from "react-rainbow-components/components/Spinner";
import ModalVoter from "components/Modals/ModalVoter";

const ListTagsWithVoters = lazy(() => import("components/Lists/ListTagsWithVoters"));

// [-] Create/Edit Tags
// [x] Modal upload Voters
// [x] "Modal create Tags" -> Voters create tags
// [] Generate and download plantilla

type PropsTabVoters = {
  updateElection: (data: { [key: string]: any; }) => Promise<any>;
};

export default function TabVoters(props: PropsTabVoters) {
  const [isOpenModalVoter, openModalVoter] = useState<boolean>(false);

  return <div>
    <ModalVoter
      isOpen={isOpenModalVoter}
      pushData={props.updateElection}
      closeModal={() => openModalVoter(false)}
    />
    <RenderIf isTrue={!isOpenModalVoter}>
      <div className='breadcrumbs-with-button'>
        <Button
          label="Descargar plantilla"
          onClick={() => { }}
          variant="neutral"
        />
        <Button
          label="Subir / Actualizar votantes"
          onClick={() => openModalVoter(true)}
          variant="success"
        />
      </div>
      <div className='elections-tabs-view-section'>
        <p>Tab voters</p>
        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <Spinner size="large" type="arc" variant="brand" />
            </div>
          }
        >
          <ListTagsWithVoters />
        </Suspense>
      </div>
    </RenderIf>
  </div>
}

