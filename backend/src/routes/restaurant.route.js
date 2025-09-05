import express from "express";
import * as restaurantController from "../controllers/restaurant.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("logo_url"),
  restaurantController.crearRestaurante
);
router.get("/", restaurantController.listarRestaurantes);
router.get("/:id", restaurantController.obtenerRestaurante);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("logo_url"),
  restaurantController.actualizarRestaurante
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  restaurantController.eliminarRestaurante
);

export default router;
