import express from "express";
import {
  crearRestaurante,
  listarRestaurantes,
  obtenerRestaurante,
  actualizarRestaurante,
  eliminarRestaurante,
} from "../controllers/restaurant.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("logo_url"), crearRestaurante);
router.get("/", listarRestaurantes);
router.get("/:id", obtenerRestaurante);
router.put("/:id", actualizarRestaurante);
router.delete("/:id", eliminarRestaurante);

export default router;
