import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGODB_HOST,
  MONGO_DATABASE,
  MONGODB_URI,
  TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

const getMongoURI = () => {
  if (NODE_ENV === "atlas") {
    if (MONGODB_URI && MONGODB_URI.trim() !== "") {
      return MONGODB_URI;
    }
    throw new Error("No se encontró MONGODB_URI en .env para Atlas");
  }

  // Si no es atlas, usamos local
  return `mongodb://${MONGODB_HOST}:27017/${MONGO_DATABASE}`;
};

export default {
  PORT: PORT || 4000,
  NODE_ENV: NODE_ENV || "local",
  MONGO_URI: getMongoURI(),
  TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
