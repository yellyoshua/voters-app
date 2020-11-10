import React, { useEffect, useState, memo, useMemo } from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import ModalPreviewVoter from "components/Modals/ModalPreviewVoter";
import CardTag from "components/Card/CardTag";
import { TypeVoter, TypeTagObj } from "types/electionTypes";

type PropsListTagsWithVoters = {};

const { convertDoubleArrToObjArr } = useParserData();

export default memo(function ListTagsWithVoters(_props: PropsListTagsWithVoters) {
  const { theElection } = useTheElection();
  const [isOpenModal, openModal] = useState(false);
  const [tagKey, setTagKey] = useState<string>("");
  const [tagsWithVoters, setTagsWithVoters] = useState<ObjTagWithVoters>({});
  const voters = useMemo<TypeVoter>(() => theElection.voters, [theElection.voters]);
  const tags = convertDoubleArrToObjArr<TypeTagObj>(theElection.tags);

  useEffect(function () {
    let mounted = true;

    if (mounted) {
      buildTagsWithVotersAndPush(tags, convertDoubleArrToObjArr(voters.data), setTagsWithVoters);
    }

    return () => {
      mounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="grid-items-row">
    <ModalPreviewVoter
      isOpen={isOpenModal}
      title={tags.find(tag => tag.slug === tagKey)?.name || ""}
      voters={{
        data: tagsWithVoters[tagKey] || [],
        fields: voters.fields
      }}
      onClose={(state) => {
        setTagKey("");
        return openModal(state);
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
  [tagSlug: string]: any[];
};

function buildTagsWithVotersAndPush(tags: TypeTagObj[], voters: any[], cb: (arg: ObjTagWithVoters) => void) {
  let tagWithVoters: ObjTagWithVoters = {};

  tags.forEach(tag => {
    tagWithVoters = { ...tagWithVoters, [tag.slug]: voters.filter(voter => voter.tag_slug === tag.slug) };
  });

  return cb(tagWithVoters);
};