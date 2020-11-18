import React, { useState, memo, useMemo, useContext } from "react";
import { TheElectionContext } from "context/TheElectionContext";
import ModalPreviewVoter from "components/Modals/ModalPreviewVoter";
import CardTag from "components/Card/CardTag";
import { TypeVoter } from "types/electionTypes";

type PropsListTagsWithVoters = {};

export default memo(function ListTagsWithVoters(_props: PropsListTagsWithVoters) {
  const theElection = useContext(TheElectionContext)!;
  const [isOpenModal, openModal] = useState(false);
  const [tagKey, setTagKey] = useState<string>("");
  const voters = useMemo<TypeVoter>(() => theElection.voters, [theElection.voters]);
  const tags: string[] = useMemo(() => theElection.tags, [theElection.tags]);

  return <div className="grid-items-row">
    <ModalPreviewVoter
      isOpen={isOpenModal}
      selectedTag={tagKey}
      onClose={(state) => {
        setTagKey("");
        return openModal(state);
      }}
    />
    {
      tags.map((tag, index) => (
        <CardTag
          key={index}
          tag={tag}
          countVoters={voters.data[tag].length}
          onOpenTag={(slug) => {
            setTagKey(slug);
            return openModal(true);
          }}
        />
      ))
    }
  </div>
});