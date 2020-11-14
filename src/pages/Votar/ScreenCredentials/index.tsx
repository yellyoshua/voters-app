import React from "react";
import { TypeElectionFunc } from "types/electionTypes";

type PropsScreenCredentials = {
  election: TypeElectionFunc;
};

export default function ScreenCredentials({ election }: PropsScreenCredentials) {
  return <p>
    Credentials Page : {election.name}
  </p>
}