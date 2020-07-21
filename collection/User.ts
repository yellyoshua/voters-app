export type User = {
  name: string;
  avatar: string;
  account: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmed: boolean;
  blocked?: boolean;
};

export type Users = [User];