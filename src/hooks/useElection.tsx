import { useCallback, useMemo, useContext } from "react";
import useSWR from "swr";
import { TokenContext } from "context/UserContext";
import useFetch from "hooks/useFetch";
import { parseArrToObjArr, extractFieldArrValuesOf } from "utils/parsersData";

export interface PropsUseElection {
  dataType: "object" | "string" | "number";
  dataUrl: string;
  removeUrl: string;
  updateUrl: string;
  createUrl: string;
}

export default function useElection(props: PropsUseElection) {
  const jwt = useContext(TokenContext);

  const api = useSWR(() => {
    return jwt ? [props.dataUrl, jwt] : null;
  }, { refreshInterval: 5000 });
  const { fetchPutWithToken, fetchPostWithToken, fetchDelWithToken } = useFetch();

  const data = useMemo(() => {
    if (typeof api.data === props.dataType) {
      return api.data;
    }
    return null;
  }, [api.data, props.dataType]);

  const isFetching = !api.error && !api.data;
  const isFetchError = api.error;

  const apiCreate = useCallback(
    async (newData: { [key: string]: any }) => {
      try {
        await fetchPostWithToken(props.createUrl, jwt, newData);
        return await api.revalidate();
      } catch (error) {
        return await api.revalidate();
      }
    },
    [props.createUrl, fetchPostWithToken, jwt, api]
  );

  const apiUpdate = useCallback(
    async (newData: { [key: string]: any }) => {
      try {
        await fetchPutWithToken(props.updateUrl, jwt, newData);
        return await api.revalidate();
      } catch (error) {
        return await api.revalidate();
      }
    },
    [props.updateUrl, fetchPutWithToken, jwt, api]
  );

  const apiRemove = useCallback(
    async (url: string | null, cb: () => void) => {
      try {
        await fetchDelWithToken(url ? url : props.removeUrl, jwt);
        return cb();
      } catch (error) {
        return cb();
      }
    },
    [props.removeUrl, fetchDelWithToken, jwt]
  );

  const getParsedObj = useCallback(
    function (item: string, arr?: any[]) {
      if (arr) {
        return parseArrToObjArr(arr);
      }
      return parseArrToObjArr(Boolean(data) ? data[item] : []);
    },
    [data]
  );

  const getValuesField = useCallback(
    function (item: string, field: string, arrId?: number) {
      if (arrId) {
        return extractFieldArrValuesOf(Boolean(data[arrId]) ? data[arrId][item] : [], field);
      }
      return extractFieldArrValuesOf(Boolean(data) ? data[item] : [], field);
    },
    [data]
  );

  return { apiUpdate, apiRemove, getValuesField, getParsedObj, apiCreate, api, data, isFetching, isFetchError };
}
