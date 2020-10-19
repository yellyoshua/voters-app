import { TypeElection } from "types/appTypes";

export const votersDataModel: ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode", "tag_slug", "idukay_code"] =
  ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode", "tag_slug", "idukay_code"];

export const tagsDataModel: ["name", "slug", "can_vote"] =
  ["name", "slug", "can_vote"];

export const candidatesDataModel: ["names", "surnames", "position", "course", "campaign_slug"] =
  ["names", "surnames", "position", "course", "campaign_slug"];

export const campaignsDataModel: ["name", "slug", "cover_image", "logo_image", "commitments_file"] =
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