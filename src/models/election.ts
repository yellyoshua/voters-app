import { TypeVoterArr, TypeTagArr, TypeCandidateArr, TypeElection, TypeCampaignArr } from "types/electionTypes";

export const votersDataModel: TypeVoterArr =
  ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode", "tag_slug", "idukay_code"];

export const tagsDataModel: TypeTagArr =
  ["name", "slug", "can_vote"];

export const candidatesDataModel: TypeCandidateArr =
  ["names", "surnames", "position", "course", "campaign_slug"];

export const campaignsDataModel: TypeCampaignArr =
  ["name", "slug", "cover_image", "logo_image", "commitments_file"];

export const defaultCampaign = {
  [campaignsDataModel[0]]: "",
  [campaignsDataModel[1]]: "",
  [campaignsDataModel[2]]: null,
  [campaignsDataModel[3]]: null,
  [campaignsDataModel[4]]: null
}

export const defaultElection: TypeElection = {
  name: "",
  uid: "",
  cover_image: {},
  status: "no_active",
  voters: [votersDataModel],
  tags: [tagsDataModel],
  candidates: [candidatesDataModel],
  campaigns: [campaignsDataModel],
};