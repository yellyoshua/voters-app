import axios from "axios";

const headersAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export default function userFetch() {
  const fetchGetWithToken = async (url: string, token: string) => {
    return await axios.get(url, { headers: headersAuth(token) }).then(data => data.data);
  };
  const fetchGetWithoutToken = async (url: string) => {
    return await axios.get(url).then(data => data.data);
  };
  const fetchPostWithToken = async (url: string, token: string | null, data: any) => {
    return await axios.post(url, data, token ? { headers: headersAuth(token) } : {}).then(data => data.data);
  };
  const fetchPostWithoutToken = async (url: string, data: any) => {
    return await axios.post(url, data).then(data => data.data);
  };
  const fetchPutWithToken = async (url: string, token: string | null, data: any) => {
    return await axios.put(url, data, token ? { headers: headersAuth(token) } : {}).then(data => data.data);
  };
  const fetchPutWithoutToken = async (url: string, data: any) => {
    return await axios.put(url, data).then(data => data.data);
  };
  const fetchDelWithToken = async (url: string, token: string | null) => {
    return await axios.delete(url, token ? { headers: headersAuth(token) } : {}).then(data => data.data);
  };
  const fetchDelWithoutToken = async (url: string) => {
    return await axios.delete(url).then(data => data.data);
  };
  return {
    fetchGetWithToken,
    fetchGetWithoutToken,
    fetchPostWithToken,
    fetchPostWithoutToken,
    fetchPutWithToken,
    fetchPutWithoutToken,
    fetchDelWithToken,
    fetchDelWithoutToken
  };
}
