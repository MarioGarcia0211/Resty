import * as userService from "../services/user.service.js";

export const crearUsuario = async (req, res) => {
  try {
    const { rol } = req.body;
    const usuarioLogueado = req.user;

    // 1. SUPERADMIN
    if (usuarioLogueado.rol === "superadmin") {
      if (rol !== "admin" && rol !== "mesero") {
        return res.status(403).json({
          message: "Un superadmin solo puede crear admin o mesero",
        });
      }

      if (!req.body.restaurante) {
        return res
          .status(400)
          .json({ message: "Debes indicar el restaurante" });
      }

      const nuevoUsuario = await userService.crearUsuario(req.body);
      return res.status(201).json(nuevoUsuario);
    }

    // 2. ADMIN
    if (usuarioLogueado.rol === "admin") {
      if (rol !== "mesero") {
        return res
          .status(403)
          .json({ message: "Un admin solo puede crear meseros" });
      }

      // Forzar el restaurante del admin
      req.body.restaurante = usuarioLogueado.restaurante;

      const nuevoUsuario = await userService.crearUsuario(req.body);
      return res.status(201).json(nuevoUsuario);
    }

    // 3. MESERO (o cualquier otro)
    return res
      .status(403)
      .json({ message: "No tienes permisos para crear usuarios" });
  } catch (error) {
    if (error.message === "El correo ya está registrado") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error al crear usuario:", error);
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
    if (error.message.includes("El correo ya está registrado")) {
      return res.status(400).json({ message: error.message });
    }
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
