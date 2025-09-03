import { Restaurant } from "../models/restaurant.model.js";

export const crearRestaurante = async (data) => {
  const restaurante = Restaurant(data);
  return await restaurante.save();
};

export const listarRestaurantes = async () => {
  return await Restaurant.find();
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
