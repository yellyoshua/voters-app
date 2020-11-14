import React from "react";
import { Link } from "react-router-dom";
import { TypeElectionFunc } from "types/electionTypes";

type PropsScreenElections = {
  elections: TypeElectionFunc[];
};

export default function ScreenElections({ elections }: PropsScreenElections) {
  return <div>
    {
      elections.map((election, index) => {
        return <Link key={index} to={`/votar?id=${election.id}`}>
          {election.name}
        </Link>
      })
    }
  </div>
}