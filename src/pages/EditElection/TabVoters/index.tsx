import React, { useState } from "react";
import Button from "react-rainbow-components/components/Button";
import RenderIf from "react-rainbow-components/components/RenderIf";
import ModalVoter from "components/Modals/ModalVoter";
import ListTagsWithVoters from "components/Lists/ListTagsWithVoters";
import deferComponentRender from "components/DeferComponentRender";

const DeferListTagsWithVoters = deferComponentRender(ListTagsWithVoters);

// [x] Tags generate on every Excel upload
// [x] Modal upload Voters
// [x] "Modal create Tags" -> Voters create tags
// [] Generate and download plantilla

export type PropsTabVoters = {};

export default function TabVoters(_: PropsTabVoters) {
  const [isOpenModalVoter, openModalVoter] = useState<boolean>(false);

  return <div>
    <ModalVoter
      isOpen={isOpenModalVoter}
      closeModal={() => openModalVoter(false)}
    />
    <RenderIf isTrue={!isOpenModalVoter}>
      <div className='breadcrumbs-with-button'>
        <Button
          label="Subir / Actualizar votantes"
          onClick={() => openModalVoter(true)}
          variant="success"
        />
      </div>
      <div className='elections-tabs-view-section'>
        <DeferListTagsWithVoters />
      </div>
    </RenderIf>
  </div>
}

