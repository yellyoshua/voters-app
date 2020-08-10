export * from "./posts";

export const DOMAIN_NAME: string = process.env.TLS_DOMAIN || "iamyell.team";
export const IS_DEV: boolean = !!(process.env.NODE_ENV === "development");