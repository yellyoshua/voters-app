import React, { useMemo } from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import CardCandidate from "components/Card/CardCandidate";
import { doubleArrRemoveItem } from "utils/parsersData";
import { TypeCampaignObj, TypeCandidateObj, TypeElectionFunc } from "types/electionTypes";

type PropsListCandidates = {
  updateElection: (data: TypeElectionFunc) => Promise<any>;
  editCandidate: (slug: string | null) => void;
}

const { convertDoubleArrToObjArr } = useParserData();
export default function ListCandidates({ editCandidate, updateElection }: PropsListCandidates) {
  const { theElection } = useTheElection();
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);
  const candidates = convertDoubleArrToObjArr<TypeCandidateObj>(theElection.candidates);
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  return <div>
    {
      candidates.map((candidate, index) => (
        <CardCandidate
          key={index}
          cargos={cargos}
          candidate={candidate}
          campaigns={campaigns}
          onRequestOpen={editCandidate}
          onRequestDelete={async slug => {
            return await updateElection(
              {
                candidates: doubleArrRemoveItem(theElection.candidates, "slug", slug)
              }
            );
          }}
        />
      ))
    }
  </div>
}