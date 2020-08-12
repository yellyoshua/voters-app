import { apiPost } from "./index";

export const getAllPost = async (page?: number) => {
  let response;

  try {
    let posts;

    if (!!Number(page)) {
      posts = await apiPost.posts.browse({ page, include: ["tags", "authors"] });
    }

    posts = await apiPost.posts.browse({ include: ["tags", "authors"] });
    response = posts;
  } catch (error) {
    console.log({ error })
    throw new Error("Error al pedir los datos");
  }

  return response;
}

export const getPostBySlug = async (slug: string) => {
  let response;

  try {
    const post = await apiPost.posts.read({ slug }, { formats: ["html"], include: ["tags", "authors"] });
    response = post;
  } catch (error) {
    throw new Error("Publicacion no encontrada");
  }

  return response;
}

export const getEvents = async (page?: number) => {
  let response;

  try {
    let events;

    if (!!Number(page)) {
      events = await apiPost.posts.browse({ page, filter: "tag:eventos+tag:events", include: ["tags", "authors"] });
    }

    events = await apiPost.posts.browse({ filter: "tag:eventos+tag:events", include: ["tags", "authors"] });
    response = events;
  } catch (error) {
    throw new Error("Error al pedir los datos");
  }

  return response;
}