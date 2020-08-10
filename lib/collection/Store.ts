import { ReactNode } from "react";
import { User } from "./User";
import { CREATE_POST, CREATE_SESSION, REMOVE_SESSION } from "../constants";

export type storeState = {
  session: User | null;
  userCanView: string[];
}

export type storeDispatchActions = {
  type: typeof CREATE_POST | typeof CREATE_SESSION | typeof REMOVE_SESSION;
  value: {};
}

export type storeComponentProps = {
  children: ReactNode;
  session: User | null;
  title?: string;
}