import { TypeCandidateArr, TypeElection, TypeCampaignArr, TypeCampaignObj, TypeCandidateObj, TypeCargo } from "types/electionTypes";

// export const votersDataModel: TypeVoterArr =
//   ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode", "tag_slug", "idukay_code"];

export const candidatesDataModel: TypeCandidateArr =
  ["slug", "names", "surnames", "cargo", "course", "campaign_slug", "avatar"];

export const campaignsDataModel: TypeCampaignArr =
  ["name", "slug", "cover_image", "logo_image", "commitments_file"];

export const defaultCampaign: TypeCampaignObj = {
  name: "",
  slug: "",
  cover_image: null,
  logo_image: null,
  commitments_file: null
}

export const defaultCargo: TypeCargo = {
  alias: "",
  slug: ""
}

export const defaultCandidate: TypeCandidateObj = {
  slug: "",
  names: "",
  surnames: "",
  course: "",
  cargo: "",
  avatar: null,
  campaign_slug: ""
}

export const defaultElection: TypeElection = {
  name: "",
  uid: "",
  cover_image: {},
  status: "no_active",
  cargos: [],
  voters: {
    fields: [],
    data: {}
  },
  tags: [],
  candidates: [candidatesDataModel],
  campaigns: [campaignsDataModel],
  first_auth: { active: false, field: "", name: "" },
  second_auth: { active: false, field: "", name: "" }
};