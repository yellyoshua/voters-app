import React, { ReactNode, memo } from "react";
import ElectionsContent from "./ElectionsContent";
import DisplayError from "./DisplayError";
import FreelancerCover from "icons/FreelancerCover";
import { IContentLoaderProps } from "react-content-loader";

type PropsContentLoader = {
  children?: ReactNode;
  isFetching: any;
  isError: Error | null;
  isNoData: boolean;
  propsContentLoader?: IContentLoaderProps;
  contentScreen: "elections";
  messageNoData: string;
};

export default memo(function ContentLoader(props: PropsContentLoader) {
  if (!props.isFetching && props.isNoData) {
    return (
      <div className='display-content-screen'>
        <FreelancerCover className='display-content-screen-cover' />
        <p className='display-content-screen-title'>{props.messageNoData}</p>
      </div>
    );
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
    return <>{props.children}</>;
  }
});
