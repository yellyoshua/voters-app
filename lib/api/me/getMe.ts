import fetch from "isomorphic-fetch";
import { GET_ME } from "../../constants";

export const getMe = async (token: string | null | undefined) => {
  let response;

  try {
    const request = await fetch(GET_ME, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (request.status === 401) {
      throw new Error("Error en la session");
    }

    response = await request.json();
  } catch (error) {
    throw new Error("Error en la session");
  }

  return response;
}