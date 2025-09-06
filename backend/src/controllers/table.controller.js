import * as tableService from "../services/table.service.js";

export const crearMesa = async (req, res) => {
  try {
    const mesa = await tableService.crearMesa(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    if (
      error.message.includes(
        "Ya existe una mesa con ese número en este restaurante"
      )
    ) {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al crear mesa", error: error.message });
  }
};

export const listarMesas = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const mesas = await tableService.listarMesas(restauranteId);
    res.json(mesas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al listar mesas", error: error.message });
  }
};

export const obtenerMesa = async (req, res) => {
  try {
    const mesa = await tableService.obtenerMesaPorId(req.params.id);
    if (!mesa) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json(mesa);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener mesa", error: error.message });
  }
};

export const actualizarMesa = async (req, res) => {
  try {
    const mesa = await tableService.actualizarMesa(req.params.id, req.body);
    if (!mesa) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json(mesa);
  } catch (error) {
    if (
      error.message.includes(
        "Ya existe una mesa con ese número en este restaurante"
      )
    ) {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al actualizar mesa", error: error.message });
  }
};

export const eliminarMesa = async (req, res) => {
  try {
    const mesa = await tableService.eliminarMesa(req.params.id);
    if (!mesa) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json({ message: "Mesa eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar mesa", error: error.message });
  }
};
