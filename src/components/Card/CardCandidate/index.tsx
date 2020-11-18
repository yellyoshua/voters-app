import { Formik } from "formik";
import React, { useCallback } from "react";
import Avatar from "react-rainbow-components/components/Avatar";
import Badge from "react-rainbow-components/components/Badge";
import Button from "react-rainbow-components/components/Button";
import _ from "underscore";
import { TypeCampaignObj, TypeCandidateObj, TypeCargo } from "types/electionTypes";
import "./index.css";

type PropsCardCandidate = {
  candidate: TypeCandidateObj;
  campaigns: TypeCampaignObj[];
  cargos: TypeCargo[];
  onRequestOpen: (campaignSlug: string) => void;
  onRequestDelete: (campaignSlug: string) => Promise<any>;
}

export default function CardCandidate({ candidate, campaigns, cargos, onRequestDelete, onRequestOpen }: PropsCardCandidate) {
  const setFullName = _.template("<%= names %> <%= surnames %>");
  const getCampaignName = useCallback((): string => {
    let campaignName = "";

    for (let { slug, name } of campaigns) {
      if (candidate.campaign_slug === slug) {
        campaignName = name;
        break;
      }
    }

    return campaignName;
  }, [candidate, campaigns]);

  return <Formik
    initialValues={{}}
    onSubmit={() => onRequestDelete(candidate.slug)}
  >
    {
      function ({ isSubmitting, submitForm }) {
        return <div className="list-items-row card-candidate rainbow-m-around_medium">
          <div className="list-items-row card-candidate-avatar-fname">
            <Avatar
              size="large"
              style={{ width: 110, height: 110 }}
              src={candidate.avatar?.url}
              title={setFullName(candidate)}
              assistiveText={setFullName(candidate)}
            />
            <h1>{setFullName(candidate)}</h1>
          </div>
          <Badge style={{ fontSize: '1rem' }}
            label={cargos.find((cargo) => cargo.slug === candidate.cargo)?.alias}
          />
          <Badge style={{ fontSize: '1rem' }}
            label={getCampaignName()}
          />
          <Badge style={{ fontSize: '1rem' }}
            label={candidate.course}
          />
          <div className="list-items-row">
            <Button onClick={() => onRequestOpen(candidate.slug)} label="Abrir" disabled={isSubmitting} />
            <Button onClick={submitForm} label="Borrar" variant="destructive" disabled={isSubmitting} />
          </div>
        </div>
      }
    }
  </Formik>
}