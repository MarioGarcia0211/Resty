import * as restaurantService from "../services/restaurant.service.js";
import * as uploadService from "../services/upload.service.js";

// export const crearRestaurante = async (req, res) => {
//   try {
//     const restaurante = await restaurantService.crearRestaurante(req.body);
//     res.status(201).json(restaurante);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const crearRestaurante = async (req, res) => {
  try {
    let logo_url = null;

    if (req.file) {
      logo_url = await uploadService.uploadImageToCloudinary(req.file.buffer);
    }

    const restaurante = await restaurantService.crearRestaurante({
      ...req.body,
      logo_url,
    });

    res.status(201).json(restaurante);
  } catch (error) {
    res.status(500).json({ message: "Error al crear restaurante", error });
  }
};

export const listarRestaurantes = async (req, res) => {
  try {
    const restaurantes = await restaurantService.listarRestaurantes();
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerRestaurante = async (req, res) => {
  try {
    const restaurante = await restaurantService.obtenerRestaurantePorId(
      req.params.id
    );
    if (!restaurante)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    res.json(restaurante);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarRestaurante = async (req, res) => {
  try {
    const restaurante = await restaurantService.actualizarRestaurante(
      req.params.id,
      req.body
    );
    if (!restaurante)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    res.json(restaurante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarRestaurante = async (req, res) => {
  try {
    const restaurante = await restaurantService.eliminarRestaurante(
      req.params.id
    );
    if (!restaurante)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    res.json({ message: "Restaurante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
