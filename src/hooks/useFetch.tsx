import axios from "axios";

const headersAuth = (token: string) => ({ Authorization: `Bearer ${token}` });


export default function userFetch() {
  const fetchWithToken = async (url: string, token: string) => {
    return await axios.get(url, { headers: headersAuth(token) }).then(data => data.data);
  }
  const fetchWithoutToken = async (url: string) => {
    return await axios.get(url).then(data => data.data);
  }
  return {
    fetchWithToken,
    fetchWithoutToken
  }
};