import { DOMAIN_NAME, IS_DEV } from "./index"

export const GET_ME = IS_DEV ? `http://localhost:3000/api/users/me` : `https://api.${DOMAIN_NAME}/users/me`;

export const GET_POST_BY_SLUG = IS_DEV ? `http://localhost:3000/api/posts/` : `https://api.${DOMAIN_NAME}/publicacion/`;

export const GET_POSTS = IS_DEV ? `http://localhost:3000/api/posts` : `https://api.${DOMAIN_NAME}/publicaciones`;

export const GET_NOTICES = IS_DEV ? `http://localhost:3000/api/posts` : `https://api.${DOMAIN_NAME}/publicaciones/noticias`;

export const GET_EVENTS = IS_DEV ? `http://localhost:3000/api/posts` : `https://api.${DOMAIN_NAME}/publicaciones/eventos`;