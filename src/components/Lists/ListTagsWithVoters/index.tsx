import React from "react";
import { useTheElection } from "context/TheElectionContext"
import useParserData from "hooks/useParserData";
import Accordion from "react-rainbow-components/components/Accordion";
import AccordionSection from "react-rainbow-components/components/AccordionSection";
import TableWithPagination from "components/TableWithPagination";
import { TypeVoterObj, TypeTagObj } from "types/electionTypes";

type PropsListTagsWithVoters = {};

const { convertDoubleArrToObjArr } = useParserData();

export default function ListTagsWithVoters(_props: PropsListTagsWithVoters) {
  const { theElection } = useTheElection();
  const voters = convertDoubleArrToObjArr<TypeVoterObj>(theElection.voters);
  const tags = convertDoubleArrToObjArr<TypeTagObj>(theElection.tags);
  const tagsWithVoters = buildTagsWithVoters(tags, voters);

  return <Accordion>
    {
      tagsWithVoters.map((tag, index) => {
        return <AccordionSection label={tag.tagName} key={index}>
          <TableWithPagination
            data={tag.voters}
            fields={["name", "surname", "ci", "idukay_code"]}
            limit={5}
            keyField="ci"
          />
        </AccordionSection>
      })
    }
  </Accordion>;
}

type TypeTagsWithVoters = { tagName: string, voters: TypeVoterObj[] }

function buildTagsWithVoters(tags: TypeTagObj[], voters: TypeVoterObj[]): TypeTagsWithVoters[] {
  const tagsWithVoters: TypeTagsWithVoters[] = tags.map(tag => {
    const votersfilter = voters.filter(voter => voter.tag_slug === tag.slug);
    return {
      tagName: tag.name,
      voters: votersfilter
    }
  });
  return tagsWithVoters;
};