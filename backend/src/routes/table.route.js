import { Router } from "express";
import * as tableController from "../controllers/table.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("superadmin", "admin"),
  tableController.crearMesa
);
router.get(
  "/",
  verifyToken,
  authorizeRoles("superadmin", "admin", "mesero"),
  tableController.listarMesas
);
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin", "admin", "mesero"),
  tableController.obtenerMesa
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin", "admin"),
  tableController.actualizarMesa
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin", "admin"),
  tableController.eliminarMesa
);

export default router;
