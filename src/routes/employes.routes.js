import { Router } from "express";
import {
  getEmployes,
  createEmployes,
  updateEmployes,
  deleteEmployes,
  getEmployesById,
} from "../controllers/employes.controller.js";

const router = Router();

router.get("/empleados", getEmployes);
router.get("/empleados/:id", getEmployesById);
router.post("/empleados", createEmployes);
router.patch("/empleados/:id", updateEmployes);
router.delete("/empleados/:id", deleteEmployes);

export default router;
