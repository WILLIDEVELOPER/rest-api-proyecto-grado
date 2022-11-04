import express from "express";
import { _pool } from "./db.js";
import router from "./routes/usuarios.routes.js";
import post from "./routes/post.routes.js"
import cors from "cors";
import fileUpload from "express-fileupload";


const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}));
app.use("/api", router);
app.use("/api", post);


app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not found",
  });
});

export default app;