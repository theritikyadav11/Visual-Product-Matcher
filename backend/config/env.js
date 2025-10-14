// config/env.js
import dotenv from "dotenv";
dotenv.config();

const getEnv = (key, required = true) => {
  if (process.env[key]) return process.env[key];
  if (required) throw new Error(`Missing env var: ${key}`);
  return undefined;
};

export const MONGODB_URI = getEnv("MONGODB_URI");
export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
export const JINA_API_KEY = getEnv("JINA_API_KEY");
export const ADMIN_SEED_TOKEN = getEnv("ADMIN_SEED_TOKEN", false);
export const PORT = getEnv("PORT", false) || 5000;
