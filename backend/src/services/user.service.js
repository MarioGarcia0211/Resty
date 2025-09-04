import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const crearUsuario = async (data) => {
  const usuarioExistente = await User.findOne({ email: data.email });
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.contrasena, 10);

  const usuario = new User({
    ...data,
    contrasena: hashedPassword,
  });

  return await usuario.save();
};

export const listarUsuarios = async () => {
  return await User.find().select("-contrasena").populate("restaurante");
};

export const obtenerUsuarioPorId = async (id) => {
  return await User.findById(id).select("-contrasena").populate("restaurante");
};

export const actualizarUsuario = async (id, data) => {
  if (data.email) {
    const usuarioExistente = await User.findOne({ email: data.email });

    if (usuarioExistente && usuarioExistente._id.toString() !== id) {
      throw new Error("El correo ya está registrado por otro usuario");
    }
  }

  if (data.contrasena) {
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
  }

  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-contrasena"
  );
};

export const eliminarUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};
