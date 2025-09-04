import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../libs/jwt.js";

export const loginUser = async ({ email, contrasena }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(contrasena, user.contrasena);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const payload = { id: user._id, rol: user.rol };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = (token) => {
  const decoded = verifyRefreshToken(token);
  const payload = { id: decoded.id, rol: decoded.rol };
  return createAccessToken(payload);
};
