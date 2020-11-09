import React from "react";
import CardLink from "components/Card/CardLink";
import { TypeCardLink } from "types/appTypes";
import "./index.css"

type PropsCardLinks = {
  links: TypeCardLink[];
}

export default function ListCardLinks({ links }: PropsCardLinks) {
  return <div className="card-links">
    {
      links.map((props, index) => (
        <CardLink {...props} key={index} />
      ))
    }
  </div>
}