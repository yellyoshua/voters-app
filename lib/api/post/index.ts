import PostsContentApi from "@tryghost/content-api";
import { POSTS_CONTENT_API_KEY } from "../../../configs";
export * from "./getPosts";
// import fetch from "isomorphic-fetch";
// import { GET_POSTS, GET_EVENTS, GET_NOTICES, GET_POST_BY_SLUG } from "../../constants";

export const apiPost = new PostsContentApi({
  url: "https://blog.gonzu.edu.ec",
  version: "v3",
  key: POSTS_CONTENT_API_KEY
});