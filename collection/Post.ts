type Portada = {
  _id?: String;
  name?:String;
  alternativeText?:String;
  caption?:String;
  hash?:String;
}

export type Post = {
  _id: String;
  Titulo: String;
  Redaccion: String;
  createdAt: Date;
  updatedAt: Date;
  Portada: Portada;
};

export type PropsPost = {
  post: Post;
};

export type Posts = Post[];

export type PropsPosts = {
  posts: Posts;
};