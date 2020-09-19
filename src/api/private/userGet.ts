import axios from "axios";

const headersAuth = (token: string) => ({ Authorization: `Bearer ${token}` });


export default function userGet(gToken: string | null) {
  const fetchGetMe = async (url: string, fToken?: string) => {
    const token = fToken || gToken;
    if (!token) {
      throw new Error("session_expired");
    } else {
      return await axios.get(url, { headers: headersAuth(token) }).then(data => data.data);
    }
  }
  return {
    fetchGetMe
  }
};