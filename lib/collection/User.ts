import * as USER_ROL from "../constants";

export type userRoles = typeof USER_ROL.USER_ADMINISTRATOR | typeof USER_ROL.USER_CLIENT | typeof USER_ROL.USER_WRITTER;

export type User = {
  id: number | any;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean | null;
  role: {
    id: number | any;
    name: userRoles;
    description: string;
    type: string;
  };
  publication?: number | any;
  created_at: Date | any;
  updated_at?: Date | any;
}