import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_HOST: process.env.MONGO_HOST || "127.0.0.1",
  MONGO_DATABASE: process.env.MONGO_DATABASE || "library",
  JWT_SECRET: process.env.JWT_SECRET || "ssh",
};
