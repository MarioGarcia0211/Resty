import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      autoCreate: true, // ponlo en false si no quieres que cree colecciones automáticamente
    });
    console.log(`Conectado a MongoDB (${config.NODE_ENV})`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};
