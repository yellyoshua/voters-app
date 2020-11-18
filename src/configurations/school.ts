import { TypeSchool } from "types/appTypes";
import { isProduction } from "configurations/variables";
import prod_config from "../config.json";

const default_config: TypeSchool = {
  "schoolName": "UE. Demo School",
  "schoolAlias": "UE. DSchool",
  "schoolAbreviation": "DSchool",
  "schoolIcon": ""
}


export default isProduction ? prod_config.school_conf as TypeSchool : default_config;
