import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    logo_url: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Restaurant = model("Restaurant", restaurantSchema);
