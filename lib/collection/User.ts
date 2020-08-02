export type User = {
  username: string;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  provider: string;
  password?: string;
  confirmed: boolean;
  active: boolean;
};

export type Users = [User];