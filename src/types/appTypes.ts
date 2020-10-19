
export type TypeStatusElection = "active" | "closed" | "archived" | "no_active";

export interface TypeElection {
  id?: string | number;
  uid: string;
  cover_image?: any;
  status: TypeStatusElection;
  name: string;
  voters: TypeVoter[];
  tags: TypeTag[];
  candidates: TypeCandidate[];
  campaigns: TypeCampaign[];
}

export type TypeCandidate = any[];

export type TypeObjCandidate = {
  names: string;
  surnames: string;
  position: string;
  course: string;
  campaign: string | number;
};

export type TypeTag = any[];
// {
//   slug: string;
//   name: string;
// };

export type TypeVoter = any[];
// {
//   name: string;
//   second_name: string;
//   surname: string;
//   second_surname: string;
//   tag: TypeTag;
// };

export type TypeProspect = {
  names: string;
  surnames: string;
  position: string;
};

export type TypeCampaign = any[];

// {
//   id?: any;
//   name: string;
//   integrants: TypeProspect[];
//   commitments: string;
// };
