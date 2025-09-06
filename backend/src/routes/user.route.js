import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("superadmin", "admin"),
  userController.crearUsuario
);
router.get("/", userController.listarUsuarios);
router.get("/:id", userController.obtenerUsuario);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("superadmin", "admin"),
  userController.actualizarUsuario
);
router.delete("/:id", userController.eliminarUsuario);

export default router;
