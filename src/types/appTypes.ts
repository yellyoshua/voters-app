export type TypeCardLink = {
  cover?: string;
  link: string;
  title: string;
  external: boolean;
  description?: string
}

export type TypeSchool = {
  schoolName: string;
  schoolAlias: string;
  schoolAbreviation: string;
  schoolIcon: any;
};

export interface FileApi {
  id: string | number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: number | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  related: any[]
}