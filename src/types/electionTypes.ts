export type TypeCampaignArr = Array<keyof TypeCampaignObj>;

export type TypeCampaignObj = {
  name: string;
  slug: string;
  cover_image: any;
  logo_image: any;
  commitments_file: any;
};

export type TypeVoterArr = Array<keyof TypeVoterObj>;

export type TypeVoterObj = {
  name: string;
  second_name: string;
  surname: string;
  second_surname: string;
  ci: string;
  enrollmentcode: string;
  tag_slug: string;
  idukay_code: string;
};

export type TypeTagArr = Array<keyof TypeTagObj>;

export type TypeTagObj = {
  name: string;
  slug: string;
  can_vote: boolean;
};

export type TypeCandidateArr = Array<keyof TypeCandidateObj>;

export type TypeCandidateObj = {
  names: string;
  surnames: string;
  position: string;
  course: string;
  campaign_slug: string;
};

export type TypeStatusElection = "active" | "closed" | "archived" | "no_active";

export interface TypeElection {
  id?: string | number;
  uid: string;
  cover_image?: any;
  status: TypeStatusElection;
  name: string;
  voters: any[];
  tags: any[];
  candidates: any[];
  campaigns: any[];
};
