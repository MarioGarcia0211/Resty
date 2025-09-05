import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const crearUsuario = async (data) => {
  const { email, contrasena, rol, restaurante } = data;

  // Validar si el correo ya existe
  const usuarioExistente = await User.findOne({ email });
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado");
  }

  // Validar que admin y mesero siempre tengan restaurante asignado
  if (rol === "admin" || rol === "mesero") {
    if (!restaurante) {
      throw new Error(`Un ${rol} debe pertenecer a un restaurante`);
    }
  }

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const usuario = new User({
    ...data,
    contrasena: hashedPassword,
  });

  return await usuario.save();
};

export const listarUsuarios = async () => {
  return await User.find()
    .select("-contrasena")
    .populate("restaurante", "nombre direccion telefono");
};

export const obtenerUsuarioPorId = async (id) => {
  return await User.findById(id)
    .select("-contrasena")
    .populate("restaurante", "nombre direccion telefono");
};

export const actualizarUsuario = async (id, data) => {
  if (data.email) {
    const usuarioExistente = await User.findOne({ email: data.email });
    if (usuarioExistente && usuarioExistente._id.toString() !== id) {
      throw new Error("El correo ya está registrado por otro usuario");
    }
  }

  if (data.rol === "admin" || data.rol === "mesero") {
    if (!data.restaurante) {
      throw new Error(`Un ${data.rol} debe pertenecer a un restaurante`);
    }
  }

  if (data.contrasena) {
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
  }

  return await User.findByIdAndUpdate(id, data, { new: true })
    .select("-contrasena")
    .populate("restaurante", "nombre direccion telefono");
};

export const eliminarUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};
