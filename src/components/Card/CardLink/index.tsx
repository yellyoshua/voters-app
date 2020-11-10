import React from "react";
import { Link } from "react-router-dom";
import { TypeCardLink } from "types/appTypes";
import "./index.css";

type PropsCardLink = TypeCardLink;

export default function CardLink({ link, cover, title, description }: PropsCardLink) {
  const coverImage = cover !== undefined ? { backgroundImage: `url(${cover})` } : {};

  return <div className="card-link-wrapper">
    <Link to={link} style={coverImage} className="card-link-container">
      <h1 className="card-link-title">{title}</h1>
      <p className="card-link-desc">{description}</p>
    </Link>
  </div>
}