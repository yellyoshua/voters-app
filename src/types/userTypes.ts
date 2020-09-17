export type TypeUser = {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: string;
  role: TypeRole;
} | null;

export type TypeRole = {
  name: string;
  description: string;
  type: string;
};