import { FileApi } from "types/appTypes";

export type TypeCampaignArr = Array<keyof TypeCampaignObj>;

export type TypeCampaignObj = {
  name: string;
  slug: string;
  cover_image: FileApi[] | null;
  logo_image: FileApi[] | null;
  commitments_file: FileApi[] | null;
};

export type TypeVoter = {
  fields: string[];
  data: any[];
}

export type TypeTagArr = Array<keyof TypeTagObj>;

export type TypeTagObj = {
  name: string;
  slug: string;
};

export type TypeCargo = {
  slug: string;
  alias: string;
}

export type TypeCandidateArr = Array<keyof TypeCandidateObj>;

export type TypeCandidateObj = {
  slug: string;
  names: string;
  surnames: string;
  cargo: string;
  course: string;
  campaign_slug: string;
};

export type TypeStatusElection = "active" | "closed" | "no_active";

export interface TypeElectionFunc {
  id?: string | number;
  uid?: string;
  cover_image?: any;
  status?: TypeStatusElection;
  name?: string;
  voters?: {
    fields: string[];
    data: any[];
  };
  tags?: any[];
  candidates?: any[];
  campaigns?: any[];
  first_auth?: TypeAuthVote;
  second_auth?: TypeAuthVote;
}

export interface TypeElection {
  id?: string | number;
  uid: string;
  cover_image?: any;
  status: TypeStatusElection;
  name: string;
  cargos: TypeCargo[];
  voters: {
    fields: string[];
    data: any[];
  };
  tags: any[];
  candidates: any[];
  campaigns: any[];
  first_auth: TypeAuthVote;
  second_auth: TypeAuthVote;
};

export type TypeAuthVote = {
  active: boolean;
  field: string;
  name: string;
}