import api from "./axios";

export const listarRestaurantes = (page = 1, limit = 10, search = "") =>
  api.get("/restaurantes", { params: { page, limit, search } });

export const obtenerRestaurante = (id) => api.get(`/restaurantes/${id}`);

export const crearRestaurante = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }
  return api.post("/restaurantes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const actualizarRestaurante = (id, data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return api.put(`/restaurantes/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const eliminarRestaurante = (id) => api.delete(`/restaurantes/${id}`);
