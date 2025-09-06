import { Table } from "../models/table.model.js";

export const crearMesa = async (data) => {
  const mesaExistente = await Table.findOne({
    numero_mesa: data.numero_mesa,
    restaurante: data.restaurante,
  });

  if (mesaExistente) {
    throw new Error("Ya existe una mesa con ese número en este restaurante");
  }

  const mesa = new Table(data);
  return await mesa.save();
};

export const listarMesas = async (restauranteId) => {
  return await Table.find({ restaurante: restauranteId }).populate(
    "restaurante",
    "nombre direccion telefono"
  );
};

export const obtenerMesaPorId = async (id) => {
  return await Table.findById(id).populate(
    "restaurante",
    "nombre direccion telefono"
  );
};

export const actualizarMesa = async (id, data) => {
  if (data.numero_mesa && data.restaurante) {
    const mesaExistente = await Table.findOne({
      numero_mesa: data.numero_mesa,
      restaurante: data.restaurante,
      _id: { $ne: id },
    });
    if (mesaExistente) {
      throw new Error("Ya existe una mesa con ese número en este restaurante");
    }
  }

  return await Table.findByIdAndUpdate(id, data, { new: true }).populate(
    "restaurante",
    "nombre direccion telefono"
  );
};

export const eliminarMesa = async (id) => {
  return await Table.findByIdAndDelete(id);
};
