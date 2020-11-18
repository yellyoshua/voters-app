import React from "react";
import "./index.css";

type PropsCardTag = {
  tag: string;
  onOpenTag: (tag: string) => void;
  countVoters: number;
};

export default function CardTag({ tag, countVoters, onOpenTag }: PropsCardTag) {
  if (!tag) {
    return <div>No tag found</div>
  }
  return <div className="card-tag-container" onClick={() => onOpenTag(tag)}>
    <h1 className="card-tag-title">{tag}</h1>
    <div className="card-tag-body-wrapper">
      <h3 className="card-tag-body-wrapper-content">{countVoters}</h3>
    </div>
  </div>
}