import * as userService from "../services/user.service.js";

export const crearUsuario = async (req, res) => {
  try {
    const usuario = await userService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await userService.obtenerUsuarioPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await userService.actualizarUsuario(
      req.params.id,
      req.body
    );
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await userService.eliminarUsuario(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
