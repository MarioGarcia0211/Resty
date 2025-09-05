export const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado, token inválido" });
    }

    const { rol } = req.user;

    if (!rolesPermitidos.includes(rol)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos suficientes" });
    }

    next();
  };
};
