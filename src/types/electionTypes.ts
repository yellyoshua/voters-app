import { FileApi } from "types/appTypes";

type Obj<T> = { [k: string]: T };

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
  data: Obj<any[]>;
}

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
  avatar: FileApi | null;
  campaign_slug: string;
};

export type TypeStatusElection = "active" | "closed" | "no_active";

export interface TypeElectionFunc {
  id?: string | number;
  uid?: string;
  cover_image?: any;
  status?: TypeStatusElection;
  name?: string;
  cargos?: TypeCargo[];
  voters?: TypeVoter;
  tags?: string[];
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
  voters: TypeVoter;
  tags: string[];
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

export type TypeElectionStats = {
  id: string | number;
  name: string;
  candidates: string[];
  uid: string;
  status: TypeStatusElection;
  cargos: TypeCargo[];
  first_auth: TypeAuthVote;
  second_auth: TypeAuthVote;
  tags: string[];
  campaigns: Obj<TypeCampaignObj>;
  total_votes: number;
  count_per_tag: Obj<number>;
  votes_group: {
    count_by_tag: Obj<number>,
    count_by_campaign: Obj<number>
  };
}