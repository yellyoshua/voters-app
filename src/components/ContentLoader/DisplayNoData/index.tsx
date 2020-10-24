import React from "react";
import FreelancerCover from "icons/FreelancerCover";

type PropsDisplayNoData = { message?: string }

const defaultMessage = "";

export default function DisplayNoData({ message = defaultMessage }: PropsDisplayNoData) {
  return <div className='display-content-screen'>
    <FreelancerCover className='display-content-screen-cover' />
    <p className='display-content-screen-title'>{message}</p>
  </div>
}