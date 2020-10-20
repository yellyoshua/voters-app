import { isProduction } from "configurations/variables";

export const REACT_API_URL = isProduction ? "https://api.gonzu.edu.ec" : "http://iamyell.team:4000";