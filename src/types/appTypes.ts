export type TypeElection = {
  name: string;
  campaigns: TypeCampaign[];
}

export type TypeProspect = {
  names: string;
  surnames: string;
  position: string;
};

export type TypeCampaign = {
  name: string;
  integrants: TypeProspect[];
  commitments: string;
}