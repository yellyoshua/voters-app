export type PostTag = {
  id: string | number;
  name: string;
  slug: string;
  description: null | string;
  feature_image: null | string;
  visibility: string | null;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  canonical_url: string | null;
  accent_color: string | null;
  url: string | null;
}
export type PostAuthor = {
  id: string | number;
  name: string | null;
  slug: string | null;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  meta_title: string | null;
  meta_description: string | null;
  url: string | null;
};
export type Post = {
  slug: string;
  id: string | number;
  uuid?: string | null;
  title: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: boolean;
  visibility: string;
  created_at: string | Date;
  updated_at: string | Date;
  published_at: string;
  custom_excerpt: boolean | string | null;
  codeinjection_head: boolean | string | null;
  codeinjection_foot: boolean | string | null;
  custom_template: boolean | string | null;
  canonical_url: boolean | string | null;
  tags?: PostTag[];
  authors?: PostAuthor[];
  primary_author?: PostAuthor;
  primary_tag?: PostTag;
  send_email_when_published: boolean;
  url: string | null;
  excerpt: string;
  reading_time: number | null | string;
  og_image?: string;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  email_subject: string | null;
};

export type PropsPost = {
  post: Post;
};

export type Posts = Post[];

export type PropsPosts = {
  posts: Posts;
};