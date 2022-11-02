import { Router } from "express";
import {
  getUsers,
  getLoginUser,
  createUsers,
  updateUsers,
  deleteUsers
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsers);
router.get("/loginusuario", getLoginUser);
router.post("/crearUsuario", createUsers);
router.patch("/actualizarUsuario/:id", updateUsers);
router.delete("/eliminarUsuario/:id", deleteUsers);
// router.get("/empleados/:id", getEmployesById);
// router.post("/empleados", createEmployes);
// router.patch("/empleados/:id", updateEmployes);
// router.delete("/empleados/:id", deleteEmployes);

export default router;
