import { isProduction } from "configurations/variables";
import prod_config from "../config.json";

const default_api = "http://192.168.100.10:4000";
const local_api_pdf = "http://192.168.100.10:8080/convert?auth=arachnys-weaver&url=";

export const REACT_API_URL = isProduction ? prod_config.api.endpoint : default_api;

export const API_PDF = isProduction ? prod_config.api.pdf_convertor : local_api_pdf;