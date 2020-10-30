import React, { useEffect, useState, memo } from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import ModalPreviewVoter from "components/Modals/ModalPreviewVoter";
import CardTag from "components/Card/CardTag";
import { TypeVoterObj, TypeTagObj } from "types/electionTypes";
import "./index.css";

type PropsListTagsWithVoters = {};

const { convertDoubleArrToObjArr } = useParserData();

export default memo(function ListTagsWithVoters(_props: PropsListTagsWithVoters) {
  const { theElection } = useTheElection();
  const [isOpenModal, openModal] = useState(false);
  const [tagKey, setTagKey] = useState<string | null>(null);
  const [tagsWithVoters, setTagsWithVoters] = useState<ObjTagWithVoters>({});
  const voters = convertDoubleArrToObjArr<TypeVoterObj>(theElection.voters);
  const tags = convertDoubleArrToObjArr<TypeTagObj>(theElection.tags);

  useEffect(function () {
    let mounted = true;

    if (mounted) {
      buildTagsWithVotersAndPush(tags, voters, setTagsWithVoters);
    }

    return () => {
      mounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="list-tags-container">
    <ModalPreviewVoter
      isOpen={isOpenModal}
      title={tags.find(tag => tag.slug === tagKey)?.name || ""}
      voters={tagKey ? tagsWithVoters[tagKey] : []}
      onClose={(state) => {
        openModal(state);
        return setTagKey(null);
      }}
    />
    {
      Object.keys(tagsWithVoters).map((tagSlug, index) => (
        <CardTag
          key={index}
          tag={tags.find((tag) => tag.slug === tagSlug) || null}
          countVoters={tagsWithVoters[tagSlug].length}
          onOpenTag={(slug) => {
            setTagKey(slug);
            return openModal(true);
          }}
        />
      ))
    }
  </div>
});

type ObjTagWithVoters = {
  [tagSlug: string]: TypeVoterObj[];
};

function buildTagsWithVotersAndPush(tags: TypeTagObj[], voters: TypeVoterObj[], cb: (arg: ObjTagWithVoters) => void) {
  let tagWithVoters: ObjTagWithVoters = {};

  tags.forEach(tag => {
    tagWithVoters = { ...tagWithVoters, [tag.slug]: voters.filter(voter => voter.tag_slug === tag.slug) };
  });

  return cb(tagWithVoters);
};