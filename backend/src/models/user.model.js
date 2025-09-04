import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contrasena: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: String,
      enum: ["superadmin", "admin", "mesero"],
      required: true,
    },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    }, // null si es superadmin
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
