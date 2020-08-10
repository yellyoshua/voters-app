import { ReactElement } from "react";
import { Post } from "../../lib/collection/Post";
import SectionReader from "./sectionReader";
// import "./global.css";
// import "./screen.css";

export const Reader = (props: { post: Post }): ReactElement => {

  return (
    <>
      <SectionReader post={props.post} />
    </>
  )
}