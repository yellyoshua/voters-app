import { useCallback, useMemo, useContext } from "react";
import useSWR from "swr";
import { TokenContext } from "context/UserContext";
import useFetch from "hooks/useFetch";
import { parseDoubleArrToObjArr, doubleArrExtractValues } from "utils/parsersData";

export interface PropsUseElection {
  id?: string
}

export interface PropsConfApi {
  dataUrl: string;
  createUrl: string;
  removeUrl: string;
  updateUrl: string;
}

const confApi = (id?: string): PropsConfApi => {
  return {
    dataUrl: id ? `/elections/${id}` : "/elections/",
    createUrl: id ? `/elections/${id}` : "/elections/",
    removeUrl: id ? `/elections/${id}` : "/elections/",
    updateUrl: id ? `/elections/${id}` : "/elections/"
  };
};

const { fetchPutWithToken, fetchPostWithToken, fetchDelWithToken } = useFetch();

export default function useElection({ id }: PropsUseElection) {
  const props = confApi(id);
  const jwt = useContext(TokenContext);


  const api = useSWR(() => {
    return jwt ? [props.dataUrl, jwt] : null;
  }, { refreshInterval: 5000 });


  const data = useMemo(() => {
    if (typeof api.data === "object") {
      return api.data;
    }
    return null;
  }, [api.data]);

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
    [props.createUrl, jwt, api]
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
    [props.updateUrl, jwt, api]
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
    [props.removeUrl, jwt]
  );

  const getParsedObj = useCallback(
    function (item: string, arr?: any[]) {
      if (arr) {
        return parseDoubleArrToObjArr(arr);
      }
      return parseDoubleArrToObjArr(Boolean(data) ? data[item] : []);
    },
    [data]
  );

  const getValuesField = useCallback(
    function (item: string, field: string, arrId?: number) {
      if (arrId) {
        return doubleArrExtractValues(Boolean(data[arrId]) ? data[arrId][item] : [], field);
      }
      return doubleArrExtractValues(Boolean(data) ? data[item] : [], field);
    },
    [data]
  );

  console.log({ data });

  return { apiUpdate, apiRemove, getValuesField, getParsedObj, apiCreate, api, data, isFetching, isFetchError };
}
