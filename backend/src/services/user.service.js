import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const crearUsuario = async (data) => {
  const hashedPassword = await bcrypt.hash(data.contrasena, 10);

  const usuario = new User({
    ...data,
    contrasena: hashedPassword,
  });

  return await usuario.save();
};

export const listarUsuarios = async () => {
  return await User.find().populate("restaurante");
};

export const obtenerUsuarioPorId = async (id) => {
  return await User.findById(id).populate("restaurante");
};

export const actualizarUsuario = async (id, data) => {
  if (data.contrasena) {
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
  }
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const obtenerUsuarioPorEmail = async (email) => {
  return await User.findOne({ email }).populate("restaurante");
};
