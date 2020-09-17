export type TypeElection = {
  name: string;
  campaigns: TypeCampaign[];
}

export type TypeProspect = {
  name: string;
  surname: string;
  position: string;
};

export type TypeCampaign = {
  name: string;
  integrants: TypeProspect[];
  commitments: string;
  description: string;
}