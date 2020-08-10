import useSWR, { mutate, trigger } from "swr";
import { canUseBrowser, getTokenFromCookie } from "./useBrowser";
import { getMe } from "../lib/api/me";
import { getAllPost } from "../lib/api/post";
import * as endpoints from "../lib/constants";

type fetchPropsType = {
  endpoint: string;
  token: string | null | undefined;
}

const fetchRequest = (props: fetchPropsType, getDataFunction?: (token?: string | null) => any, beFunction?: (page?: number) => any) => {
  const endpoint = props.endpoint;
  const beToken = !!props.token;

  if (beFunction) {
    return useSWR(endpoint, beFunction)
  }

  if (beToken && getDataFunction) {
    const useGetDataWithToken = () => getDataFunction(props.token);
    return useSWR(endpoint, useGetDataWithToken);
  } else if (getDataFunction) {
    const useGetDataWithoutToken = () => getDataFunction();
    return useSWR(endpoint, useGetDataWithoutToken);
  }
  return useSWR("", () => ({}));
}

export const useMe = () => {
  const token: string | undefined = getTokenFromCookie(null);
  const fetchProps = {
    token,
    endpoint: endpoints.GET_ME
  };
  return {
    fetch: canUseBrowser ? fetchRequest(fetchProps, getMe) : { data: null, error: null, isValidating: false }
  }
}


export const usePost = () => {
  const fetchProps = {
    token: null,
    endpoint: "tagPosts",
  }
  return {
    fetch: canUseBrowser ? fetchRequest(fetchProps, undefined, getAllPost) : { data: null, error: null, isValidating: false }
  };
}