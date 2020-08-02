import { ReactNode } from "react";
import { User } from "./User";
import { HomePageProps, BlogPageProps, ContactPageProps } from "./Page"

export type sessionStoreDispatch = void;
export type layoutStoreDispatch = void;

export type sessionStoreValueProps = {
  sessionToken: string;
  session: {
    profiles: [{
      name: string;
      show: string;
      can: string;
    }?];
  };
  user: User | null;
  content: {};
}
export type sessionStoreProps = {
  children: ReactNode;
  value: sessionStoreValueProps;
}

export type layoutStorePagesProps = {
  homepage?: HomePageProps;
  blogpage?: BlogPageProps;
  contactpage?: ContactPageProps;
  private?: { title: string; };
};
export type layoutStoreProps = {
  children: ReactNode;
  value: {
    page: layoutStorePagesProps;
  };
  variant: "private" | "homepage" | "blogpage" | "contactpage";
}
export type useContextLayoutStoreProps = [{ page: layoutStorePagesProps }, void]