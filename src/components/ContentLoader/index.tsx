import React, { ReactNode } from "react";
import ElectionsContent from "./ElectionsContent";
import DisplayError from "./DisplayError";
import { IContentLoaderProps } from "react-content-loader";


type PropsContentLoader = {
  children: ReactNode;
  isFetching: any;
  isError: Error | null;
  isNoData: boolean;
  propsContentLoader?: IContentLoaderProps;
  contentScreen: "elections";
};

export default function ContentLoader(props: PropsContentLoader) {
  if (!props.isFetching && props.isNoData) {
    return <p>No hay listas disponibles</p>;
  } else if (props.isError) {
    return <DisplayError message={props.isError.message} />;
  } else if (props.isFetching) {
    switch (props.contentScreen) {
      case "elections":
        return <ElectionsContent {...props.propsContentLoader} />;
      default:
        return null;
    }
  } else {
    return <>
      {props.children}
    </>;
  }
}