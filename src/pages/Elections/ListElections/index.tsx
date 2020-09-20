import React, {useContext} from "react";
import ContentLoader from "components/ContentLoader";
import useSWR from "swr";
import UserContext from "context/UserContext";
// import getAllElections from "api/private/getAllElections";
import { TypeElection } from "types/appTypes";
// import "./index.css";

type PropsListElections = {};

export default function ListElections(_props: PropsListElections) {
  const { jwt } = useContext(UserContext)!;
  // const { fetchAllElections } = getAllElections(getSessionToken());
  const { data, error } = useSWR(["/elections", jwt], { initialData: null });
  const elections: TypeElection[] | null = data || [];
  const haveElections: boolean = elections ? elections.length === 0 : false;

  return <ContentLoader
    isFetching={!error && !data}
    isError={error}
    isNoData={haveElections}
    contentScreen="elections"
  >
    <div>
      <p>Havee</p>
      {
        elections && elections.map(((election: TypeElection, index: number) => {
          return <p key={index}>{election.name}</p>
        }))
      }
    </div>
  </ContentLoader>
}