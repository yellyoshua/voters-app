import React from "react";
import { TypeTagObj } from "types/electionTypes";
import "./index.css";

type PropsCardTag = {
  tag: TypeTagObj | null;
  onOpenTag: (tagSlug: string) => void;
  countVoters: number;
};

export default function CardTag({ tag, countVoters, onOpenTag }: PropsCardTag) {
  if (!tag) {
    return <div>No tag found</div>
  }
  return <div className="card-tag-container" onClick={() => onOpenTag(tag.slug)}>
    <h1 className="card-tag-title">{tag.name}</h1>
    <div className="card-tag-body-wrapper">
      <h3 className="card-tag-body-wrapper-content">{countVoters}</h3>
    </div>
  </div>
}