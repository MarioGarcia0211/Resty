import { Restaurant } from "../models/restaurant.model.js";

export const crearRestaurante = async (data) => {
  const restaurante = Restaurant(data);
  return await restaurante.save();
};

export const listarRestaurantes = async (page = 1, limit = 10, search = "") => {
  const query = search
    ? {
        $or: [
          { nombre: { $regex: search, $options: "i" } },
          { direccion: { $regex: search, $options: "i" } },
          { telefono: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  const [restaurantes, total] = await Promise.all([
    Restaurant.find(query).skip(skip).limit(limit),
    Restaurant.countDocuments(query),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: restaurantes,
  };
};

export const obtenerRestaurantePorId = async (id) => {
  return await Restaurant.findById(id);
};

export const actualizarRestaurante = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarRestaurante = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};
