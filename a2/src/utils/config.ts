import dotenv from "dotenv";
dotenv.config();

const PORT: number = parseInt(process.env.PORT || "3030", 10);

const MONGO_URI: string | undefined =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

export default {
  MONGO_URI,
  PORT,
};
