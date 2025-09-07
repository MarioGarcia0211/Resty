import api from "./axios";

export const login = async (email, contrasena) => {
  const res = await api.post("/auth/login", { email, contrasena });
  return res.data;
};

export const refresh = async (refreshToken) => {
  const res = await api.post("/auth/refresh", { refreshToken });
  return res.data;
};
