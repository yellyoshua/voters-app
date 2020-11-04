import React from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import { TypeCampaignObj } from "types/electionTypes";

const { convertDoubleArrToObjArr } = useParserData();

export function ListCandidates() {
  const { theElection } = useTheElection();

  // const candidates = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.candidates);

  return <div>

  </div>
}