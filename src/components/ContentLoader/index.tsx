import React, { ReactNode, memo } from "react";
import ElectionsContent from "./ElectionsContent";
import { IContentLoaderProps } from "react-content-loader";

import DisplayError from "./DisplayError";
import DisplayNoData from "./DisplayNoData";
import DisplayNotFound from "./DisplayNotFound";
import "./index.css";

type TypeContentShapes = "elections";

type PropsContentLoader = {
  children?: ReactNode;
  isFetching: any;
  isError: Error | null;
  isNoData: boolean;
  propsContentLoader?: IContentLoaderProps;
  contentScreen: TypeContentShapes;
  messageNoData?: string;
};

export default memo(function ContentLoader(props: PropsContentLoader) {
  const noData = !props.isFetching && props.isNoData;
  const notFound = props.isError && props.isError.message.includes("404");
  const error = props.isError && !props.isError.message.includes("404");

  if (noData) {
    return <DisplayNoData message={props.messageNoData} />;
  }
  if (notFound) {
    return <DisplayNotFound />;
  }
  if (error) {
    return <DisplayError />
  }
  if (props.isFetching) {
    return <ContentShapes shape={props.contentScreen} />
  }
  return <>{props.children}</>;
});

type PropsContentShapes = {
  shape: TypeContentShapes,
  propsContent?: IContentLoaderProps
}

function ContentShapes({ shape, propsContent }: PropsContentShapes) {
  switch (shape) {
    case "elections":
      return <ElectionsContent {...propsContent} />;
    default:
      return null;
  }
}