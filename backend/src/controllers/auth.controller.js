import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(
      req.body
    );

    res.json({
      message: "Login exitoso",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("No se envió refreshToken");

    const accessToken = authService.refreshAccessToken(refreshToken);

    res.json({
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error al refrescar token",
      error: error.message,
    });
  }
};
