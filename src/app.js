import express from "express";
import { _pool } from "./db.js";
import router from "./routes/usuarios.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not found",
  });
});

export default app;