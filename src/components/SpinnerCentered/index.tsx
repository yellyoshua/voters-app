import React from "react";
import Spinner, { SpinnerProps } from "react-rainbow-components/components/Spinner";

export default function SpinnerCentered(props: SpinnerProps) {
  return <div className="rainbow-p-vertical_xx-large">
    <div className="rainbow-position_relative rainbow-m-vertical_xx-large rainbow-p-vertical_xx-large">
      <Spinner {...props} />
    </div>
  </div>
}