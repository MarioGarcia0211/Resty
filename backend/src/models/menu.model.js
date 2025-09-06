import mongoose, { Schema, model } from "mongoose";

const menuSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagen_url: {
      type: String,
    },
    categoria_menu: {
      type: String,
      enum: [
        "Entradas",
        "Platos principales",
        "Acompañamientos",
        "Especialidades de la casa",
        "Postres",
        "Bebidas",
        "Desayunos",
      ],
    },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Menu = model("Menu", menuSchema);
