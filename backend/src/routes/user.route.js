import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/", userController.crearUsuario);
router.get("/", userController.listarUsuarios);
router.get("/:id", userController.obtenerUsuario);
router.put("/:id", userController.actualizarUsuario);
router.delete("/:id", userController.eliminarUsuario);

export default router;
