import mongoose, { Schema, model } from "mongoose";

const tableSchema = new Schema(
  {
    numero_mesa: {
      type: Number,
      required: true,
      trim: true,
    },
    capacidad: {
      type: Number,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: [
        "Libre",
        "Ocupada",
        "Esperando pedido",
        "Comiendo",
        "Cuenta solicitada",
      ],
      required: true,
    },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Table = model("Table", tableSchema);
