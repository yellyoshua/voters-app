import { isProduction } from "configurations/variables";
import prod_config from "../config.json";

const default_api = "http://192.168.100.10:4000";

export const REACT_API_URL = isProduction ? prod_config.api.endpoint : default_api;