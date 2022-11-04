import { Router } from "express";
import { getPosts, createPosts, updatePost, deletePost } from "../controllers/Post.controller.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/crearPost", createPosts);
router.patch("/actualizarPost/:id", updatePost);
router.delete("/eliminarPost/:id", deletePost);
// router.get("/empleados/:id", getEmployesById);
// router.post("/empleados", createEmployes);
// router.patch("/empleados/:id", updateEmployes);
// router.delete("/empleados/:id", deleteEmployes);

export default router;