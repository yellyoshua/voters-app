import process from "process";

export const isProduction = String(process.env.NODE_ENV).toUpperCase() === "PRODUCTION";