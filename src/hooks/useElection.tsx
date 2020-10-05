import { useCallback } from "react";
import useSWR from "swr";
import useFetch from "hooks/useFetch";
import useStickyState from "hooks/useStickyState";
import { parseArrToObjArr } from "utils/parsersData";
import { TypeElection } from "types/appTypes";

interface PropsUseElection {}

export default function useElection(electionId: PropsUseElection) {
  const [jwt] = useStickyState(null, "_jwt_");
  const api = useSWR([`/elections/${electionId}`, jwt], {});
  const { fetchPutWithToken, fetchDelWithToken } = useFetch();

  const election: TypeElection | null = typeof api.data === "object" ? api.data : null;
  // const election: TypeElection = apiResponse as TypeElection;

  const isFetching = !api.error && !api.data;
  const isFetchError = api.error;

  const updateElection = useCallback(
    async (newElection: { [key: string]: any }) => {
      try {
        await fetchPutWithToken(`/elections/${electionId}`, jwt, newElection);
        return await api.revalidate();
      } catch (error) {
        return await api.revalidate();
      }
    },
    [electionId, fetchPutWithToken, jwt, api]
  );

  const removeElection = useCallback(
    async (cb: (path: string) => void) => {
      try {
        await fetchDelWithToken(`/elections/${electionId}`, jwt);
        return cb("/elections");
      } catch (error) {
        return cb("/elections");
      }
    },
    [electionId, fetchDelWithToken, jwt]
  );

  const getParsedObj = useCallback(
    function (item: "campaigns" | "voters" | "candidates" | "tags") {
      return parseArrToObjArr(election ? election[item] : []);
    },
    [election]
  );

  return { updateElection, api, election, removeElection, getParsedObj, isFetching, isFetchError };
}
