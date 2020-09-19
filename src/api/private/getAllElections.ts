import axios from "axios";

const headersAuth = (token: string) => ({ Authorization: `Bearer ${token}` });


export default function getAllElections(token: string | null): { fetchAllElections: (val: any) => Promise<any> } {
  const fetchAllElections = async (url: string) => {
    if (!token) {
      throw new Error("session_expired");
    } else {
      return await axios.get(url, { headers: headersAuth(token) }).then(data => data.data);
    }
  }
  return {
    fetchAllElections
  }
};